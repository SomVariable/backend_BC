-- DropForeignKey
ALTER TABLE "UserTranslation" DROP CONSTRAINT "UserTranslation_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserTranslation" ADD CONSTRAINT "UserTranslation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
