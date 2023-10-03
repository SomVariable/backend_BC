/*
  Warnings:

  - You are about to drop the column `userId` on the `News` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_userId_fkey";

-- AlterTable
ALTER TABLE "News" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_NewsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NewsToUser_AB_unique" ON "_NewsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsToUser_B_index" ON "_NewsToUser"("B");

-- AddForeignKey
ALTER TABLE "_NewsToUser" ADD CONSTRAINT "_NewsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToUser" ADD CONSTRAINT "_NewsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
