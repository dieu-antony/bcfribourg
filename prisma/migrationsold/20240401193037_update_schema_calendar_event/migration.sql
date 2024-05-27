/*
  Warnings:

  - You are about to drop the column `type` on the `calendarevent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `calendarevent` DROP COLUMN `type`,
    ADD COLUMN `eventType` VARCHAR(191) NOT NULL DEFAULT 'Événement';
