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
            {
                application_id: 1,
                first_name: "Sue",
                last_name: "Stephens",
                email: "sue.stephens@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "active"
            },
            {
                application_id: 1,
                first_name: "Louella",
                last_name: "Dunn",
                email: "louella.dunn@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "active"
            },
            {
                application_id: 1,
                first_name: "Joe",
                last_name: "Henderson",
                email: "joe.henderson@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "active"
            },
            {
                application_id: 1,
                first_name: "Wendy",
                last_name: "Arnold",
                email: "wendy.arnold@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "email_validation_pending"
            },
            {
                application_id: 1,
                first_name: "William",
                last_name: "Tucker",
                email: "william.tucker@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "active"
            },
            {
                application_id: 1,
                first_name: "Alexander",
                last_name: "Grant",
                email: "alexander.grant@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "active"
            },
            {
                application_id: 1,
                first_name: "Victor",
                last_name: "Henry",
                email: "victor.henry@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "inactive"
            },
            {
                application_id: 1,
                first_name: "Naomi",
                last_name: "Campbell",
                email: "naomi.campbell@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "active"
            },
            {
                application_id: 1,
                first_name: "Owen",
                last_name: "Lucas",
                email: "owen.lucas@kuzeysoftware.com",
                password: "U2FsdGVkX18uUJo2jiYJaqXBoGnkf8I7rBZheMFoSqw=",
                status: "inactive"
            },
        ],
        skipDuplicates: true
    });
    prisma.$disconnect();
}