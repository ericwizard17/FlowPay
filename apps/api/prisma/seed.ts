import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Create test user
    const passwordHash = await bcrypt.hash('password123', 10);

    const user = await prisma.user.upsert({
        where: { email: 'demo@flowpay.app' },
        update: {},
        create: {
            email: 'demo@flowpay.app',
            passwordHash,
            name: 'Demo User',
        },
    });

    console.log('✅ Created user:', user.email);

    // Create sample transactions
    const now = new Date();
    const transactions = [
        // Income
        { amount: 5000, category: 'Maaş', note: 'Aylık maaş', date: new Date(now.getFullYear(), now.getMonth(), 1) },
        { amount: 1500, category: 'Freelance', note: 'Web projesi', date: new Date(now.getFullYear(), now.getMonth(), 5) },

        // Expenses
        { amount: -500, category: 'Market', note: 'Aylık alışveriş', date: new Date(now.getFullYear(), now.getMonth(), 3) },
        { amount: -300, category: 'Ulaşım', note: 'Akbil yükleme', date: new Date(now.getFullYear(), now.getMonth(), 2) },
        { amount: -150, category: 'Eğlence', note: 'Sinema ve yemek', date: new Date(now.getFullYear(), now.getMonth(), 7) },
        { amount: -200, category: 'Faturalar', note: 'Elektrik faturası', date: new Date(now.getFullYear(), now.getMonth(), 10) },
        { amount: -100, category: 'Sağlık', note: 'Eczane', date: new Date(now.getFullYear(), now.getMonth(), 12) },
        { amount: -250, category: 'Yemek', note: 'Restoran', date: new Date(now.getFullYear(), now.getMonth(), 15) },
        { amount: -80, category: 'Spor', note: 'Spor salonu', date: new Date(now.getFullYear(), now.getMonth(), 4) },
        { amount: -400, category: 'Teknoloji', note: 'Kulaklık', date: new Date(now.getFullYear(), now.getMonth(), 20) },
    ];

    for (const transaction of transactions) {
        await prisma.transaction.create({
            data: {
                userId: user.id,
                ...transaction,
            },
        });
    }

    console.log(`✅ Created ${transactions.length} transactions`);

    // Create sample budgets
    const currentMonth = now.toISOString().slice(0, 7);
    const budgets = [
        { category: 'Market', limitAmount: 1000 },
        { category: 'Ulaşım', limitAmount: 500 },
        { category: 'Eğlence', limitAmount: 300 },
        { category: 'Faturalar', limitAmount: 400 },
        { category: 'Yemek', limitAmount: 600 },
    ];

    for (const budget of budgets) {
        await prisma.budget.create({
            data: {
                userId: user.id,
                month: currentMonth,
                ...budget,
            },
        });
    }

    console.log(`✅ Created ${budgets.length} budgets`);

    console.log('');
    console.log('🎉 Seed completed!');
    console.log('');
    console.log('📧 Demo User Email: demo@flowpay.app');
    console.log('🔑 Demo User Password: password123');
    console.log('🆔 User ID:', user.id);
    console.log('');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
