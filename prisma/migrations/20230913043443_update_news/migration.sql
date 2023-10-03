/*
  Warnings:

  - Added the required column `date` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "newsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE SET NULL ON UPDATE CASCADE;
