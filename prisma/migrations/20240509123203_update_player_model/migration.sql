/*
  Warnings:

  - Made the column `firstName` on table `player` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `player` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `player` MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `gender` VARCHAR(191) NOT NULL;
