import { seedApplicationTable } from './seeders/applicationsTableSeeder';
import { seedPermissionsTable } from './seeders/permissionsTableSeeder';
import { seedRolesHasPermissionsTable } from './seeders/rolesHasPermissionsTableSeeder';
import { seedRolesTable } from './seeders/rolesTableSeeder';
import { seedSettingsTable } from './seeders/settingsTableSeeder';
import { seedUserHasRolestable } from './seeders/userHasRolesTableSeeder';
import { seedUserTable } from './seeders/userTableSeeder';
import { PrismaClient } from '@prisma/client';
import { seedCategoriesTable } from './seeders/categoriesTableSeeder';
import { seedStoresTable } from './seeders/storesTableSeeder';
import { seedUserHasStoresTable } from './seeders/userHasStoresTableSeeder';
import { seedAttributesTable } from './seeders/attributesTableSeeder';
import { seedAttributeValuesTable } from './seeders/attributeValuesTableSeeder';
import { seedCategoryHasAttributesTable } from './seeders/categoryHasAttributesTableSeeder';
import { seedProductTables } from './seeders/productsTableSeeder';
import { seedProductVariantsTable } from './seeders/productVariantsTableSeeder';

const prisma = new PrismaClient()

async function main() {

    const nulluk = null

    await seedApplicationTable();

    await seedSettingsTable();

    await seedUserTable();

    await seedRolesTable();

    await seedPermissionsTable();

    await seedRolesHasPermissionsTable();

    await seedUserHasRolestable();

    await seedCategoriesTable(nulluk);

    await seedStoresTable();

    await seedUserHasStoresTable();

    await seedAttributesTable();

    await seedAttributeValuesTable();

    await seedCategoryHasAttributesTable();

    await seedProductTables();

    await seedProductVariantsTable();
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
});