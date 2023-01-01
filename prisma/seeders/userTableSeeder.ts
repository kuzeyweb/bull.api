import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedUserTable = async () => {
    await prisma.users.createMany({
        data: [
            {
                application_id: 1,
                first_name: "Admin",
                last_name: "local",
                email: "admin.local@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "active"
            },
            {
                application_id: 1,
                first_name: "Yunus",
                last_name: "Karabacak",
                email: "yunus.karabacak@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "active"
            },
            {
                application_id: 1,
                first_name: "Yiğitcan",
                last_name: "Göncü",
                email: "yigitcan.goncu@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "active"
            },
        ],
        skipDuplicates: true
    });
    prisma.$disconnect();
}