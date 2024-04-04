/*
  Warnings:

  - You are about to drop the column `url` on the `league` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `League_url_key` ON `league`;

-- AlterTable
ALTER TABLE `league` DROP COLUMN `url`;

-- AlterTable
ALTER TABLE `team` ADD COLUMN `url` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Team_url_key` ON `Team`(`url`);
