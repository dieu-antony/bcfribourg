/*
  Warnings:

  - You are about to drop the column `val` on the `calendarevent` table. All the data in the column will be lost.
  - Added the required column `summary` to the `CalendarEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `calendarevent` DROP COLUMN `val`,
    ADD COLUMN `summary` VARCHAR(191) NOT NULL;
