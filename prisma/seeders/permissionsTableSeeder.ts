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
                name: "role-edit"
            },
            {
                application_id: 1,
                name: "role-assign"
            },
            {
                application_id: 1,
                name: "role-update"
            },
            {
                application_id: 1,
                name: "permissions-read"
            },
            {
                application_id: 1,
                name: "permissions-assign"
            },
            {
                application_id: 1,
                name: "categories-create"
            },
            {
                application_id: 1,
                name: "categories-update"
            },
            {
                application_id: 1,
                name: "categories-delete"
            },
            {
                application_id: 1,
                name: "stores-create"
            },
            {
                application_id: 1,
                name: "stores-delete"
            },
            {
                application_id: 1,
                name: "stores-update"
            },
            {
                application_id: 1,
                name: "product-feature-create"
            },
            {
                application_id: 1,
                name: "product-feature-delete"
            },
            {
                application_id: 1,
                name: "product-feature-read"
            },
            {
                application_id: 1,
                name: "product-feature-update"
            },
            {
                application_id: 1,
                name: "product-feature-model-create"
            },
            {
                application_id: 1,
                name: "product-feature-model-read"
            },
            {
                application_id: 1,
                name: "product-feature-model-update"
            },

        ]
    });
    prisma.$disconnect();
}