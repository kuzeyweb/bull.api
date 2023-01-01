import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedApplicationTable = async () => {
    await prisma.applications.create({
        data: {
            title: "Bull Shopping",
            name: ".com.bullshopping",
            status: "active",
        }
    });
    prisma.$disconnect();
}