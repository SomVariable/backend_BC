/*
  Warnings:

  - The primary key for the `AwardTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `langcode` on the `AwardTranslation` table. All the data in the column will be lost.
  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `educationLevelId` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `graduation_year` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `study_year` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `Education` table. All the data in the column will be lost.
  - The primary key for the `ProfessionalInterestTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `langcode` on the `ProfessionalInterestTranslation` table. All the data in the column will be lost.
  - The primary key for the `TagTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `langcode` on the `TagTranslation` table. All the data in the column will be lost.
  - You are about to drop the `EducationLevel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `langCode` to the `AwardTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graduationYear` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyYear` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `langCode` to the `ProfessionalInterestTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `langCode` to the `TagTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_educationLevelId_fkey";

-- DropIndex
DROP INDEX "Education_userId_key";

-- AlterTable
ALTER TABLE "AwardTranslation" DROP CONSTRAINT "AwardTranslation_pkey",
DROP COLUMN "langcode",
ADD COLUMN     "langCode" TEXT NOT NULL,
ADD CONSTRAINT "AwardTranslation_pkey" PRIMARY KEY ("awardId", "langCode");

-- AlterTable
ALTER TABLE "ContentItem" ALTER COLUMN "videoLink" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Education" DROP CONSTRAINT "Education_pkey",
DROP COLUMN "educationLevelId",
DROP COLUMN "graduation_year",
DROP COLUMN "study_year",
DROP COLUMN "university",
ADD COLUMN     "graduationYear" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "studyYear" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Education_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProfessionalInterestTranslation" DROP CONSTRAINT "ProfessionalInterestTranslation_pkey",
DROP COLUMN "langcode",
ADD COLUMN     "langCode" TEXT NOT NULL,
ADD CONSTRAINT "ProfessionalInterestTranslation_pkey" PRIMARY KEY ("professionalInterestId", "langCode");

-- AlterTable
ALTER TABLE "TagTranslation" DROP CONSTRAINT "TagTranslation_pkey",
DROP COLUMN "langcode",
ADD COLUMN     "langCode" TEXT NOT NULL,
ADD CONSTRAINT "TagTranslation_pkey" PRIMARY KEY ("langCode", "tagId");

-- DropTable
DROP TABLE "EducationLevel";

-- CreateTable
CREATE TABLE "EducationTranslation" (
    "id" SERIAL NOT NULL,
    "langCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "educationId" INTEGER NOT NULL,

    CONSTRAINT "EducationTranslation_pkey" PRIMARY KEY ("langCode","educationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "EducationTranslation_educationId_key" ON "EducationTranslation"("educationId");

-- AddForeignKey
ALTER TABLE "EducationTranslation" ADD CONSTRAINT "EducationTranslation_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
