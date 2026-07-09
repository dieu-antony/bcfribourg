/*
  Warnings:

  - You are about to drop the column `trainer` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `trainerImage` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `trainerQualis` on the `Training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "trainer",
DROP COLUMN "trainerImage",
DROP COLUMN "trainerQualis";

-- CreateTable
CREATE TABLE "Trainer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qualis" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TrainerToTraining" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TrainerToTraining_AB_unique" ON "_TrainerToTraining"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainerToTraining_B_index" ON "_TrainerToTraining"("B");

-- AddForeignKey
ALTER TABLE "_TrainerToTraining" ADD CONSTRAINT "_TrainerToTraining_A_fkey" FOREIGN KEY ("A") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainerToTraining" ADD CONSTRAINT "_TrainerToTraining_B_fkey" FOREIGN KEY ("B") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
