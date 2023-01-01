import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedUserHasRolestable = async () => {
    await prisma.user_has_roles.createMany({
        data: {
            user_id: 1,
            role_id: 1
        }
    })
    prisma.$disconnect();
};
