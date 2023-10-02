-- DropForeignKey
ALTER TABLE "EducationTranslation" DROP CONSTRAINT "EducationTranslation_educationId_fkey";

-- AddForeignKey
ALTER TABLE "EducationTranslation" ADD CONSTRAINT "EducationTranslation_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE CASCADE ON UPDATE CASCADE;
