/*
  Warnings:

  - You are about to drop the `_ContentItemToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contentItemId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ContentItemToTag" DROP CONSTRAINT "_ContentItemToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentItemToTag" DROP CONSTRAINT "_ContentItemToTag_B_fkey";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "contentItemId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ContentItemToTag";

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
