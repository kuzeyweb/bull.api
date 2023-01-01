import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedUserHasStoresTable = async () => {
    await prisma.user_has_stores.createMany({
        data: [
            {
                user_id: 1,
                store_id: 1,
                auth: "owner",
            },
            {
                user_id: 2,
                store_id: 2,
                auth: "owner",
            },
        ]
    });
    prisma.$disconnect();
}