/*
  Warnings:

  - Made the column `photoUrl` on table `ICTeam` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ICTeam" ALTER COLUMN "photoUrl" SET NOT NULL;
