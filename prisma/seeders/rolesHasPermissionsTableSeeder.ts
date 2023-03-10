import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedRolesHasPermissionsTable = async () => {
    await prisma.roles_has_permissions.createMany({
        data: [
            {
                role_id: 1,
                permission_id: 1
            },
            {
                role_id: 1,
                permission_id: 2
            },
            {
                role_id: 1,
                permission_id: 3
            },
            {
                role_id: 1,
                permission_id: 4
            },
            {
                role_id: 1,
                permission_id: 5
            },
            {
                role_id: 1,
                permission_id: 6
            },
            {
                role_id: 2,
                permission_id: 1
            },
            {
                role_id: 2,
                permission_id: 2
            },
            {
                role_id: 2,
                permission_id: 3
            },
            {
                role_id: 2,
                permission_id: 4
            },
            {
                role_id: 2,
                permission_id: 5
            },
            {
                role_id: 2,
                permission_id: 6
            },
            {
                role_id: 2,
                permission_id: 7
            },
        ]
    });
    prisma.$disconnect();
}