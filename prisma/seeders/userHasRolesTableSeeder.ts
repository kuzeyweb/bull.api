import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedUserHasRolestable = async () => {
    await prisma.user_has_roles.createMany({
        data: [
            {
                user_id: 1,
                role_id: 1
            },
            {
                user_id: 2,
                role_id: 2
            },
            {
                user_id: 3,
                role_id: 2
            },
        ]
    })
    prisma.$disconnect();
};
