import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedProductVariantsTable = async () => {
    await prisma.product_variants.createMany({
        data: [
            {
                product_id: 1,
                attribute_id: 6,
                dimensional_weight: 2,
                attribute_value_id: 7,
                parent_id: null,
                barcode: "12ASD61"
            },
            {
                product_id: 1,
                attribute_id: 5,
                dimensional_weight: 2,
                attribute_value_id: 6,
                parent_id: 1,
                list_price: 199.99,
                sale_price: 149.99,
                barcode: "12ASD61"
            },
        ]
    });
    prisma.$disconnect();
}