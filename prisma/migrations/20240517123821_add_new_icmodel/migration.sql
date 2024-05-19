/*
  Warnings:

  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `Player_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `Team_leagueId_fkey`;

-- DropTable
DROP TABLE `team`;

-- CreateTable
CREATE TABLE `PastTeam` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL DEFAULT 1,
    `wins` INTEGER NOT NULL DEFAULT 0,
    `losses` INTEGER NOT NULL DEFAULT 0,
    `ties` INTEGER NOT NULL DEFAULT 0,
    `points` INTEGER NOT NULL DEFAULT 0,
    `matchRecord` VARCHAR(191) NOT NULL DEFAULT '0-0',
    `setRecord` VARCHAR(191) NOT NULL DEFAULT '0-0',
    `gamesRecord` VARCHAR(191) NOT NULL DEFAULT '0-0',
    `seasonStart` INTEGER NOT NULL DEFAULT 0,
    `leagueId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ICTeam` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `leagueId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PastTeam` ADD CONSTRAINT `PastTeam_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `ICTeam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ICTeam` ADD CONSTRAINT `ICTeam_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
