import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/auth.routes';
import transactionRoutes from './routes/transaction.routes';
import budgetRoutes from './routes/budget.routes';
import dashboardRoutes from './routes/dashboard.routes';
import categoryRoutes from './routes/category.routes';
import reportRoutes from './routes/report.routes';
import recurringTransactionRoutes from './routes/recurringTransaction.routes';

// Import cron jobs
import { startRecurringTransactionJob } from './jobs/cronJobs';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'FlowPay API is running',
        version: '2.0.0',
        timestamp: new Date().toISOString(),
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/recurring-transactions', recurringTransactionRoutes);

// Start cron jobs
startRecurringTransactionJob();

// Legacy AI analysis route (kept for backward compatibility)
app.get('/api/ai/analysis', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const now = new Date();
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: { gte: threeMonthsAgo },
                amount: { lt: 0 },
            },
            orderBy: { date: 'desc' },
        });

        const categoryAnalysis: Record<string, { current: number; previous: number }> = {};

        transactions.forEach(t => {
            const month = t.date.toISOString().slice(0, 7);
            const currentMonth = now.toISOString().slice(0, 7);
            const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 7);

            if (!categoryAnalysis[t.category]) {
                categoryAnalysis[t.category] = { current: 0, previous: 0 };
            }

            if (month === currentMonth) {
                categoryAnalysis[t.category].current += Math.abs(t.amount);
            } else if (month === previousMonth) {
                categoryAnalysis[t.category].previous += Math.abs(t.amount);
            }
        });

        let maxIncrease = 0;
        let maxCategory = '';

        Object.entries(categoryAnalysis).forEach(([category, data]) => {
            if (data.previous > 0) {
                const increase = ((data.current - data.previous) / data.previous) * 100;
                if (increase > maxIncrease) {
                    maxIncrease = increase;
                    maxCategory = category;
                }
            }
        });

        const message = maxIncrease > 5
            ? `${maxCategory} harcamalarınız bu ay geçen aya göre %${maxIncrease.toFixed(0)} arttı. 💡`
            : 'Harcamalarınız dengeli görünüyor. ✅';

        res.json({
            message,
            analysis: categoryAnalysis,
        });
    } catch (error) {
        next(error);
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
    });
});

// Error handler (must be last)
app.use(errorHandler);

// ============================================
// SERVER START
// ============================================

app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ========================================');
    console.log('🚀  FlowPay API Server Started');
    console.log('🚀 ========================================');
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log(`💚 Health: http://localhost:${PORT}/health`);
    console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
    console.log(`💰 Transactions: http://localhost:${PORT}/api/transactions`);
    console.log(`📊 Budgets: http://localhost:${PORT}/api/budgets`);
    console.log(`📈 Dashboard: http://localhost:${PORT}/api/dashboard`);
    console.log(`🏷️  Categories: http://localhost:${PORT}/api/categories`);
    console.log(`📄 Reports: http://localhost:${PORT}/api/reports`);
    console.log('🚀 ========================================');
    console.log('');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await prisma.$disconnect();
    console.log('✅ Database disconnected');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await prisma.$disconnect();
    console.log('✅ Database disconnected');
    process.exit(0);
});
