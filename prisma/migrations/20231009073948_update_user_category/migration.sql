/*
  Warnings:

  - The primary key for the `EmployeeProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PartnerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PracticeManagerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "EmployeeProfile" DROP CONSTRAINT "EmployeeProfile_pkey",
ADD CONSTRAINT "EmployeeProfile_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE partnerprofile_id_seq;
ALTER TABLE "PartnerProfile" DROP CONSTRAINT "PartnerProfile_pkey",
ALTER COLUMN "id" SET DEFAULT nextval('partnerprofile_id_seq'),
ADD CONSTRAINT "PartnerProfile_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE partnerprofile_id_seq OWNED BY "PartnerProfile"."id";

-- AlterTable
ALTER TABLE "PracticeManagerProfile" DROP CONSTRAINT "PracticeManagerProfile_pkey",
ADD CONSTRAINT "PracticeManagerProfile_pkey" PRIMARY KEY ("id");
