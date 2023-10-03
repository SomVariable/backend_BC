/*
  Warnings:

  - A unique constraint covering the columns `[newsId]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subtitle` to the `NewsTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PhotoType" ADD VALUE 'NEWS';

-- AlterTable
ALTER TABLE "NewsTranslation" ADD COLUMN     "subtitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "newsId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Photo_newsId_key" ON "Photo"("newsId");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
