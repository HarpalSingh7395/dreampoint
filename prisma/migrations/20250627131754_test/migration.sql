/*
  Warnings:

  - Changed the type of `type` on the `Document` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('GOVERNMENT_ID', 'EDUCATION_CERT', 'RESUME', 'EXPERIENCE_CERT', 'POLICE_VERIFICATION', 'STUDENT_ID', 'REPORT_CARD', 'PARENT_ID', 'PROFILE_PICTURE');

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "type",
ADD COLUMN     "type" "DocumentType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "extraQualifications" JSONB;
