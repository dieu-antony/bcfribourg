/*
  Warnings:

  - You are about to drop the column `league` on the `players` table. All the data in the column will be lost.
  - Added the required column `team` to the `Players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `players` DROP COLUMN `league`,
    ADD COLUMN `team` INTEGER NOT NULL;
