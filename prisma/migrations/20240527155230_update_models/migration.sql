-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "ties" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "matchRecord" TEXT NOT NULL DEFAULT '0-0',
    "setRecord" TEXT NOT NULL DEFAULT '0-0',
    "gamesRecord" TEXT NOT NULL DEFAULT '0-0',
    "seasonStart" INTEGER NOT NULL DEFAULT 0,
    "leagueId" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "PastTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarEvent" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "location" TEXT,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "eventType" TEXT NOT NULL DEFAULT 'Events',
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,

    CONSTRAINT "CalendarEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "captain" BOOLEAN NOT NULL DEFAULT false,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ICTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ICTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "League_name_key" ON "League"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarEvent_uid_key" ON "CalendarEvent"("uid");

-- AddForeignKey
ALTER TABLE "PastTeam" ADD CONSTRAINT "PastTeam_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "ICTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ICTeam" ADD CONSTRAINT "ICTeam_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
