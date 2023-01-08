/*
  Warnings:

  - Added the required column `fingerprint` to the `user_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip_address` to the `user_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_tokens` ADD COLUMN `OS` VARCHAR(191) NULL,
    ADD COLUMN `OS_version` VARCHAR(191) NULL,
    ADD COLUMN `browser` VARCHAR(191) NULL,
    ADD COLUMN `browser_version` VARCHAR(191) NULL,
    ADD COLUMN `fingerprint` VARCHAR(191) NOT NULL,
    ADD COLUMN `ip_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `isMobile` BOOLEAN NULL,
    ADD COLUMN `last_use_time` DATETIME(3) NULL,
    ADD COLUMN `user_agent` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `validation_codes` MODIFY `type` ENUM('email_verification', 'two_factor_auth', 'password_reset') NOT NULL;
