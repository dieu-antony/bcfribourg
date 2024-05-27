/*
  Warnings:

  - Made the column `captain` on table `player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `player` MODIFY `captain` BOOLEAN NOT NULL DEFAULT false;
