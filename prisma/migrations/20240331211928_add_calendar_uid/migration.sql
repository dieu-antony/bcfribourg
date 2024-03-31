/*
  Warnings:

  - You are about to drop the column `end` on the `calendarevent` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `calendarevent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `CalendarEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `CalendarEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `val` to the `CalendarEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `calendarevent` DROP COLUMN `end`,
    DROP COLUMN `summary`,
    ADD COLUMN `uid` VARCHAR(191) NOT NULL,
    ADD COLUMN `val` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CalendarEvent_uid_key` ON `CalendarEvent`(`uid`);
