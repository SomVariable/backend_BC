/*
  Warnings:

  - You are about to drop the `PersonTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PersonTranslation" DROP CONSTRAINT "PersonTranslation_person_id_fkey";

-- DropTable
DROP TABLE "PersonTranslation";

-- CreateTable
CREATE TABLE "UserTranslation" (
    "id" SERIAL NOT NULL,
    "langCode" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "surnameName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "smallDescription" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "UserTranslation_pkey" PRIMARY KEY ("langCode","person_id")
);

-- AddForeignKey
ALTER TABLE "UserTranslation" ADD CONSTRAINT "UserTranslation_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
