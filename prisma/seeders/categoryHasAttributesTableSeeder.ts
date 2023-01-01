import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedCategoryHasAttributesTable = async () => {
    await prisma.category_has_attributes.createMany({
        data: [
            {
                category_id: 1,
                attribute_id: 1
            },
            {
                category_id: 1,
                attribute_id: 2
            },
            {
                category_id: 1,
                attribute_id: 3
            },
            {
                category_id: 1,
                attribute_id: 4
            },
            {
                category_id: 1,
                attribute_id: 5
            },
        ]
    })
    prisma.$disconnect();
};
