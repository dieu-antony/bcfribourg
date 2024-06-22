/*
  Warnings:

  - You are about to drop the column `draws` on the `team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `team` DROP COLUMN `draws`,
    ADD COLUMN `ties` INTEGER NOT NULL DEFAULT 0;
