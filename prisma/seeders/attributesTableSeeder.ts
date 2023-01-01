import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedAttributesTable = async () => {
    await prisma.attributes.createMany({
        data: [
            {
                application_id: 1,
                name: "Materyal",
                is_variantable: false,
                required: true
            },
            {
                application_id: 1,
                name: "Kol Boyu",
                is_variantable: false,
                required: false

            },
            {
                application_id: 1,
                name: "Kalıp",
                is_variantable: false,
                required: false
            },
            {
                application_id: 1,
                name: "Yaka Tipi",
                is_variantable: false,
                required: false
            },
            {
                application_id: 1,
                name: "Renk",
                is_variantable: true,
                required: false
            },
            {
                application_id: 1,
                name: "Beden",
                parent_id: 5,
                is_variantable: true,
                required: false
            }
        ]
    });
    prisma.$disconnect();
}