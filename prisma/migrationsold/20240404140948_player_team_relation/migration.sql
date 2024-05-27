/*
  Warnings:

  - You are about to drop the column `team` on the `player` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `player` DROP COLUMN `team`,
    ADD COLUMN `teamId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
