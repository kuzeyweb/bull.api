import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedStoresTable = async () => {
    await prisma.stores.createMany({
        data: [
            {
                application_id: 1,
                name: "Bull Shopping",
                slug: "bull-shopping",
                status: 'active',
                banner: "null",
                icon: "null"
            },
            {
                application_id: 1,
                name: "Bull International",
                slug: "bull-international",
                status: 'active',
                banner: 'null',
                icon: 'null'
            }
        ]
    });
    prisma.$disconnect();
}