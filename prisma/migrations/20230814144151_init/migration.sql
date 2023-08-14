-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EMPLOYEE', 'REPORTER');

-- CreateEnum
CREATE TYPE "EmployeePosition" AS ENUM ('Partner', 'PracticeManager', 'Employee');

-- CreateEnum
CREATE TYPE "ContentItemType" AS ENUM ('CASE', 'PUBLISH');

-- CreateEnum
CREATE TYPE "PhotoType" AS ENUM ('CONTENT', 'AVATAR');

-- CreateEnum
CREATE TYPE "CategoryTranslationType" AS ENUM ('Area', 'Practice', 'Service');

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Practice" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Practice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "practiceId" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "type" "PhotoType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "contentItemId" INTEGER,
    "personId" INTEGER,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentItem" (
    "id" SERIAL NOT NULL,
    "type" "ContentItemType" NOT NULL,
    "videoLink" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentItemTranslation" (
    "id" SERIAL NOT NULL,
    "langCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentItemId" INTEGER NOT NULL,

    CONSTRAINT "ContentItemTranslation_pkey" PRIMARY KEY ("langCode","contentItemId")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "type" "EmployeePosition" NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerProfile" (
    "id" INTEGER NOT NULL,
    "quote_ru" TEXT NOT NULL,
    "quote_en" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "PartnerProfile_pkey" PRIMARY KEY ("personId")
);

-- CreateTable
CREATE TABLE "PracticeManagerProfile" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "PracticeManagerProfile_pkey" PRIMARY KEY ("personId")
);

-- CreateTable
CREATE TABLE "EmployeeProfile" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "EmployeeProfile_pkey" PRIMARY KEY ("personId")
);

-- CreateTable
CREATE TABLE "EducationLevel" (
    "id" SERIAL NOT NULL,
    "title_ru" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,

    CONSTRAINT "EducationLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "study_year" TIMESTAMP(3) NOT NULL,
    "graduation_year" TIMESTAMP(3) NOT NULL,
    "university" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "educationLevelId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("personId","educationLevelId")
);

-- CreateTable
CREATE TABLE "ProfessionalInterest" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "ProfessionalInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Award" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagTranslation" (
    "id" SERIAL NOT NULL,
    "langcode" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagTranslation_pkey" PRIMARY KEY ("langcode","tagId")
);

-- CreateTable
CREATE TABLE "AwardTranslation" (
    "id" SERIAL NOT NULL,
    "langcode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "awardId" INTEGER NOT NULL,

    CONSTRAINT "AwardTranslation_pkey" PRIMARY KEY ("awardId","langcode")
);

-- CreateTable
CREATE TABLE "ProfessionalInterestTranslation" (
    "id" SERIAL NOT NULL,
    "langcode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "professionalInterestId" INTEGER NOT NULL,

    CONSTRAINT "ProfessionalInterestTranslation_pkey" PRIMARY KEY ("professionalInterestId","langcode")
);

-- CreateTable
CREATE TABLE "NewsTranslation" (
    "id" SERIAL NOT NULL,
    "langCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "newsId" INTEGER NOT NULL,

    CONSTRAINT "NewsTranslation_pkey" PRIMARY KEY ("newsId","langCode")
);

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" SERIAL NOT NULL,
    "langCode" TEXT NOT NULL,
    "categoryTranslationType" "CategoryTranslationType" NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "areaId" INTEGER,
    "practiceId" INTEGER,
    "serviceId" INTEGER,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("langCode","categoryTranslationType")
);

-- CreateTable
CREATE TABLE "PersonTranslation" (
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

    CONSTRAINT "PersonTranslation_pkey" PRIMARY KEY ("langCode","person_id")
);

-- CreateTable
CREATE TABLE "_AreaToPractice" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PracticeToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContentItemToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContentItemToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_practiceId_key" ON "Tag"("practiceId");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_personId_key" ON "Photo"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerProfile_personId_key" ON "PartnerProfile"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "PracticeManagerProfile_personId_key" ON "PracticeManagerProfile"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfile_personId_key" ON "EmployeeProfile"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Education_personId_key" ON "Education"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "TagTranslation_tag_key" ON "TagTranslation"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "_AreaToPractice_AB_unique" ON "_AreaToPractice"("A", "B");

-- CreateIndex
CREATE INDEX "_AreaToPractice_B_index" ON "_AreaToPractice"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PracticeToService_AB_unique" ON "_PracticeToService"("A", "B");

-- CreateIndex
CREATE INDEX "_PracticeToService_B_index" ON "_PracticeToService"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentItemToPerson_AB_unique" ON "_ContentItemToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentItemToPerson_B_index" ON "_ContentItemToPerson"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentItemToTag_AB_unique" ON "_ContentItemToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentItemToTag_B_index" ON "_ContentItemToTag"("B");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentItemTranslation" ADD CONSTRAINT "ContentItemTranslation_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerProfile" ADD CONSTRAINT "PartnerProfile_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticeManagerProfile" ADD CONSTRAINT "PracticeManagerProfile_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "EducationLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalInterest" ADD CONSTRAINT "ProfessionalInterest_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagTranslation" ADD CONSTRAINT "TagTranslation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardTranslation" ADD CONSTRAINT "AwardTranslation_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "Award"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalInterestTranslation" ADD CONSTRAINT "ProfessionalInterestTranslation_professionalInterestId_fkey" FOREIGN KEY ("professionalInterestId") REFERENCES "ProfessionalInterest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsTranslation" ADD CONSTRAINT "NewsTranslation_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonTranslation" ADD CONSTRAINT "PersonTranslation_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaToPractice" ADD CONSTRAINT "_AreaToPractice_A_fkey" FOREIGN KEY ("A") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaToPractice" ADD CONSTRAINT "_AreaToPractice_B_fkey" FOREIGN KEY ("B") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PracticeToService" ADD CONSTRAINT "_PracticeToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PracticeToService" ADD CONSTRAINT "_PracticeToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentItemToPerson" ADD CONSTRAINT "_ContentItemToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentItemToPerson" ADD CONSTRAINT "_ContentItemToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentItemToTag" ADD CONSTRAINT "_ContentItemToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentItemToTag" ADD CONSTRAINT "_ContentItemToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
