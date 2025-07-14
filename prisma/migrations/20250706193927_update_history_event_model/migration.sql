/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "History";

-- CreateTable
CREATE TABLE "HistoryEvent" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "HistoryEvent_pkey" PRIMARY KEY ("id")
);
