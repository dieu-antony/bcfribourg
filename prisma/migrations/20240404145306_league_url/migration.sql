/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `League` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `league` ADD COLUMN `url` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `League_url_key` ON `League`(`url`);
