import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedPermissionsTable = async () => {
    await prisma.permissions.createMany({
        data: [
            {
                application_id: 1,
                name: "role-create"
            },
            {
                application_id: 1,
                name: "role-read"
            },
            {
                application_id: 1,
                name: "role-delete"
            },
            {
                application_id: 1,
                name: "role-update"
            },
            {
                application_id: 1,
                name: "role-update"
            },
            {
                application_id: 1,
                name: "user-create"
            },
            {
                application_id: 1,
                name: "user-read"
            },
            {
                application_id: 1,
                name: "user-delete"
            },
            {
                application_id: 1,
                name: "user-update"
            },
            {
                application_id: 1,
                name: "user-update"
            },
            {
                application_id: 1,
                name: "permission-read"
            },
            {
                application_id: 1,
                name: "category-create"
            },
            {
                application_id: 1,
                name: "category-update"
            },
            {
                application_id: 1,
                name: "category-delete"
            },
            {
                application_id: 1,
                name: "store-create"
            },
            {
                application_id: 1,
                name: "store-delete"
            },
            {
                application_id: 1,
                name: "store-update"
            },
            {
                application_id: 1,
                name: "attribute-create"
            },
            {
                application_id: 1,
                name: "attribute-read"
            },
            {
                application_id: 1,
                name: "attribute-update"
            },
            {
                application_id: 1,
                name: "attribute-delete"
            },
            {
                application_id: 1,
                name: "attribute-value-create"
            },
            {
                application_id: 1,
                name: "attribute-value-read"
            },
            {
                application_id: 1,
                name: "attribute-value-update"
            },
            {
                application_id: 1,
                name: "attribute-value-delete"
            },
            {
                application_id: 1,
                name: "product-create"
            },
            {
                application_id: 1,
                name: "product-update"
            },
            {
                application_id: 1,
                name: "product-delete"
            },

        ]
    });
    prisma.$disconnect();
}