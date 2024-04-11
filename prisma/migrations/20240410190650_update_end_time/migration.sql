/*
  Warnings:

  - Made the column `end` on table `calendarevent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `calendarevent` MODIFY `end` DATETIME(3) NOT NULL;
