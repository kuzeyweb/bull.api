import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedRolesTable = async () => {
    await prisma.roles.createMany({
        data: [
            {
                application_id: 1,
                name: "super_admin"
            },
            {
                application_id: 1,
                name: "admin"
            }
        ]
    });
    prisma.$disconnect();
}