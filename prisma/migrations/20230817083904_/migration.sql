/*
  Warnings:

  - The values [Area,Practice,Service] on the enum `CategoryTranslationType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `UserTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `person_id` on the `UserTranslation` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('PENDING', 'ACTIVE');

-- AlterEnum
BEGIN;
CREATE TYPE "CategoryTranslationType_new" AS ENUM ('AREA', 'PRACTICE', 'SERVICE');
ALTER TABLE "CategoryTranslation" ALTER COLUMN "categoryTranslationType" TYPE "CategoryTranslationType_new" USING ("categoryTranslationType"::text::"CategoryTranslationType_new");
ALTER TYPE "CategoryTranslationType" RENAME TO "CategoryTranslationType_old";
ALTER TYPE "CategoryTranslationType_new" RENAME TO "CategoryTranslationType";
DROP TYPE "CategoryTranslationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "UserTranslation" DROP CONSTRAINT "UserTranslation_person_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountStatus" "AccountStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "UserTranslation" DROP CONSTRAINT "UserTranslation_pkey",
DROP COLUMN "person_id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "surnameName" DROP NOT NULL,
ALTER COLUMN "middleName" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "smallDescription" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL,
ADD CONSTRAINT "UserTranslation_pkey" PRIMARY KEY ("langCode", "userId");

-- AddForeignKey
ALTER TABLE "UserTranslation" ADD CONSTRAINT "UserTranslation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
