/*
  Warnings:

  - The primary key for the `Photo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `itemId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_pkey",
ADD COLUMN     "itemId" INTEGER NOT NULL,
ADD CONSTRAINT "Photo_pkey" PRIMARY KEY ("itemId", "type");
