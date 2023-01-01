import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedProductTables = async () => {
    await prisma.products.createMany({
        data: [
            {
                application_id: 1,
                name: "Erkek Polo Yaka Slim",
                slug: "Erkek-Polo-Yaka-Slim",
                created_by: 1,
                brand_name: "Avva",
                store_id: 1,
                category_id: 1,
                vat_rate: 18
            }
        ]
    });
    prisma.$disconnect();
}