-- DropForeignKey
ALTER TABLE `product_inventories` DROP FOREIGN KEY `product_inventories_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_inventories` DROP FOREIGN KEY `product_inventories_product_variant_id_fkey`;

-- AddForeignKey
ALTER TABLE `product_inventories` ADD CONSTRAINT `product_inventories_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_inventories` ADD CONSTRAINT `product_inventories_product_variant_id_fkey` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
