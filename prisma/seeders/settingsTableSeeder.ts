import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedSettingsTable = async () => {
    await prisma.settings.createMany({
        data: [
            {
                application_id: 1,
                name: "two_factor_auth",
                value: false
            },
            {
                application_id: 1,
                name: "email_validation",
                value: false
            }
        ]
    });
    prisma.$disconnect();
}