import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seed verilerini ekleniyor...');

    // Test kullanıcısı
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            email: 'test@example.com',
            passwordHash: '$2a$10$YourHashedPasswordHere', // Gerçek uygulamada bcrypt ile hash'lenmiş olmalı
            name: 'Test Kullanıcı',
        },
    });

    console.log('✅ Kullanıcı oluşturuldu:', user.email);

    // Örnek işlemler
    const transactions = [
        { amount: 5000, category: 'Maaş', note: 'Aylık maaş', date: new Date('2025-12-01') },
        { amount: -150, category: 'Market', note: 'Haftalık alışveriş', date: new Date('2025-12-02') },
        { amount: -80, category: 'Ulaşım', note: 'Akbil yükleme', date: new Date('2025-12-03') },
        { amount: -200, category: 'Market', note: 'Büyük alışveriş', date: new Date('2025-12-04') },
        { amount: -120, category: 'Eğlence', note: 'Sinema', date: new Date('2025-12-05') },
        { amount: -90, category: 'Market', date: new Date('2025-12-06') },
        { amount: -50, category: 'Ulaşım', date: new Date('2025-12-07') },
        { amount: -180, category: 'Faturalar', note: 'Elektrik faturası', date: new Date('2025-12-08') },
    ];

    for (const transaction of transactions) {
        await prisma.transaction.create({
            data: {
                userId: user.id,
                ...transaction,
            },
        });
    }

    console.log('✅ İşlemler oluşturuldu:', transactions.length);

    // Örnek bütçeler
    const budgets = [
        { category: 'Market', limitAmount: 2000, month: '2025-12' },
        { category: 'Ulaşım', limitAmount: 500, month: '2025-12' },
        { category: 'Eğlence', limitAmount: 800, month: '2025-12' },
        { category: 'Faturalar', limitAmount: 1000, month: '2025-12' },
    ];

    for (const budget of budgets) {
        await prisma.budget.create({
            data: {
                userId: user.id,
                ...budget,
            },
        });
    }

    console.log('✅ Bütçeler oluşturuldu:', budgets.length);
    console.log('🎉 Seed tamamlandı!');
}

main()
    .catch((e) => {
        console.error('❌ Seed hatası:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
