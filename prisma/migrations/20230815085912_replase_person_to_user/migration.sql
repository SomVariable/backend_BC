/*
  Warnings:

  - You are about to drop the column `personId` on the `Award` table. All the data in the column will be lost.
  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personId` on the `Education` table. All the data in the column will be lost.
  - The primary key for the `EmployeeProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personId` on the `EmployeeProfile` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `News` table. All the data in the column will be lost.
  - The primary key for the `PartnerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personId` on the `PartnerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `Photo` table. All the data in the column will be lost.
  - The primary key for the `PracticeManagerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personId` on the `PracticeManagerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `ProfessionalInterest` table. All the data in the column will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContentItemToPerson` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `EmployeeProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `PartnerProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `PracticeManagerProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Award` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `EmployeeProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PartnerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PracticeManagerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProfessionalInterest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Award" DROP CONSTRAINT "Award_personId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_personId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeProfile" DROP CONSTRAINT "EmployeeProfile_personId_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_personId_fkey";

-- DropForeignKey
ALTER TABLE "PartnerProfile" DROP CONSTRAINT "PartnerProfile_personId_fkey";

-- DropForeignKey
ALTER TABLE "PersonTranslation" DROP CONSTRAINT "PersonTranslation_person_id_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_personId_fkey";

-- DropForeignKey
ALTER TABLE "PracticeManagerProfile" DROP CONSTRAINT "PracticeManagerProfile_personId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalInterest" DROP CONSTRAINT "ProfessionalInterest_personId_fkey";

-- DropForeignKey
ALTER TABLE "_ContentItemToPerson" DROP CONSTRAINT "_ContentItemToPerson_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentItemToPerson" DROP CONSTRAINT "_ContentItemToPerson_B_fkey";

-- DropIndex
DROP INDEX "Education_personId_key";

-- DropIndex
DROP INDEX "EmployeeProfile_personId_key";

-- DropIndex
DROP INDEX "PartnerProfile_personId_key";

-- DropIndex
DROP INDEX "Photo_personId_key";

-- DropIndex
DROP INDEX "PracticeManagerProfile_personId_key";

-- AlterTable
ALTER TABLE "Award" DROP COLUMN "personId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Education" DROP CONSTRAINT "Education_pkey",
DROP COLUMN "personId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Education_pkey" PRIMARY KEY ("userId", "educationLevelId");

-- AlterTable
ALTER TABLE "EmployeeProfile" DROP CONSTRAINT "EmployeeProfile_pkey",
DROP COLUMN "personId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "EmployeeProfile_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "News" DROP COLUMN "personId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PartnerProfile" DROP CONSTRAINT "PartnerProfile_pkey",
DROP COLUMN "personId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "PartnerProfile_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "personId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "PracticeManagerProfile" DROP CONSTRAINT "PracticeManagerProfile_pkey",
DROP COLUMN "personId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "PracticeManagerProfile_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "ProfessionalInterest" DROP COLUMN "personId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "_ContentItemToPerson";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "type" "EmployeePosition" NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContentItemToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentItemToUser_AB_unique" ON "_ContentItemToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentItemToUser_B_index" ON "_ContentItemToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Education_userId_key" ON "Education"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfile_userId_key" ON "EmployeeProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerProfile_userId_key" ON "PartnerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_userId_key" ON "Photo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PracticeManagerProfile_userId_key" ON "PracticeManagerProfile"("userId");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerProfile" ADD CONSTRAINT "PartnerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticeManagerProfile" ADD CONSTRAINT "PracticeManagerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalInterest" ADD CONSTRAINT "ProfessionalInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonTranslation" ADD CONSTRAINT "PersonTranslation_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentItemToUser" ADD CONSTRAINT "_ContentItemToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentItemToUser" ADD CONSTRAINT "_ContentItemToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
