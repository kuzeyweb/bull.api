import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedAttributeValuesTable = async () => {
    await prisma.attribute_values.createMany({
        data: [
            {
                name: "Keten",
                attribute_id: 1
            },
            {
                name: "Pamuklu",
                attribute_id: 1
            },
            {
                name: "Kadife",
                attribute_id: 1
            },
            {
                name: "Yün",
                attribute_id: 1
            },
            {
                name: "Polar",
                attribute_id: 1
            },
            {
                name: "Beyaz",
                attribute_id: 5
            },
            {
                name: "XL",
                attribute_id: 6
            }
        ]
    });
    prisma.$disconnect();
}