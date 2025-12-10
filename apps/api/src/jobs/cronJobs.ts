import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to calculate next run date
function calculateNextRun(currentDate: Date, frequency: string): Date {
    const next = new Date(currentDate);

    switch (frequency) {
        case 'daily':
            next.setDate(next.getDate() + 1);
            break;
        case 'weekly':
            next.setDate(next.getDate() + 7);
            break;
        case 'monthly':
            next.setMonth(next.getMonth() + 1);
            break;
        case 'yearly':
            next.setFullYear(next.getFullYear() + 1);
            break;
    }

    return next;
}

// Run every day at 00:01
export const startRecurringTransactionJob = () => {
    cron.schedule('1 0 * * *', async () => {
        console.log('🔄 Running recurring transaction job...');

        try {
            const now = new Date();

            // Find all due recurring transactions
            const dueTransactions = await prisma.recurringTransaction.findMany({
                where: {
                    isActive: true,
                    nextRun: { lte: now },
                    OR: [
                        { endDate: null },
                        { endDate: { gte: now } },
                    ],
                },
            });

            console.log(`Found ${dueTransactions.length} due recurring transactions`);

            for (const recurring of dueTransactions) {
                try {
                    // Create actual transaction
                    await prisma.transaction.create({
                        data: {
                            userId: recurring.userId,
                            amount: recurring.amount,
                            category: recurring.category,
                            note: recurring.note || `Recurring: ${recurring.category}`,
                            date: now,
                        },
                    });

                    // Update next run date
                    const nextRun = calculateNextRun(recurring.nextRun, recurring.frequency);

                    await prisma.recurringTransaction.update({
                        where: { id: recurring.id },
                        data: {
                            lastRun: now,
                            nextRun,
                        },
                    });

                    console.log(`✅ Created transaction for recurring ID: ${recurring.id}`);

                    // Create notification
                    await prisma.notification.create({
                        data: {
                            userId: recurring.userId,
                            type: 'recurring_transaction',
                            title: 'Tekrarlayan İşlem Oluşturuldu',
                            message: `${recurring.category} için ${Math.abs(recurring.amount)} TL işlem otomatik eklendi.`,
                            data: {
                                recurringId: recurring.id,
                                amount: recurring.amount,
                                category: recurring.category,
                            },
                        },
                    });
                } catch (error) {
                    console.error(`❌ Error processing recurring transaction ${recurring.id}:`, error);
                }
            }

            console.log('✅ Recurring transaction job completed');
        } catch (error) {
            console.error('❌ Error in recurring transaction job:', error);
        }
    });

    console.log('🚀 Recurring transaction cron job started (runs daily at 00:01)');
};

// For testing: run immediately
export const runRecurringTransactionJobNow = async () => {
    console.log('🔄 Running recurring transaction job manually...');

    try {
        const now = new Date();

        const dueTransactions = await prisma.recurringTransaction.findMany({
            where: {
                isActive: true,
                nextRun: { lte: now },
                OR: [
                    { endDate: null },
                    { endDate: { gte: now } },
                ],
            },
        });

        console.log(`Found ${dueTransactions.length} due recurring transactions`);

        for (const recurring of dueTransactions) {
            await prisma.transaction.create({
                data: {
                    userId: recurring.userId,
                    amount: recurring.amount,
                    category: recurring.category,
                    note: recurring.note || `Recurring: ${recurring.category}`,
                    date: now,
                },
            });

            const nextRun = calculateNextRun(recurring.nextRun, recurring.frequency);

            await prisma.recurringTransaction.update({
                where: { id: recurring.id },
                data: {
                    lastRun: now,
                    nextRun,
                },
            });

            await prisma.notification.create({
                data: {
                    userId: recurring.userId,
                    type: 'recurring_transaction',
                    title: 'Tekrarlayan İşlem Oluşturuldu',
                    message: `${recurring.category} için ${Math.abs(recurring.amount)} TL işlem otomatik eklendi.`,
                    data: {
                        recurringId: recurring.id,
                        amount: recurring.amount,
                        category: recurring.category,
                    },
                },
            });
        }

        console.log('✅ Manual run completed');
        return dueTransactions.length;
    } catch (error) {
        console.error('❌ Error in manual run:', error);
        throw error;
    }
};
