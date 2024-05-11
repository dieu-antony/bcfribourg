/*
  Warnings:

  - You are about to drop the column `history` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `team` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Team_name_key` ON `team`;

-- AlterTable
ALTER TABLE `player` MODIFY `firstName` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `gender` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `team` DROP COLUMN `history`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `seasonStart` INTEGER NOT NULL DEFAULT 0;
