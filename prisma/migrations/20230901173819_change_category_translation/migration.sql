/*
  Warnings:

  - The primary key for the `CategoryTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `relatedId` to the `CategoryTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_pkey",
ADD COLUMN     "relatedId" INTEGER NOT NULL,
ADD CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("langCode", "relatedId", "categoryTranslationType");
