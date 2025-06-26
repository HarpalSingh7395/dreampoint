/*
  Warnings:

  - Added the required column `type` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "currentGrade" TEXT,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "hourlyRate" INTEGER,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "qualification" TEXT,
ADD COLUMN     "specialization" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "subjects" TEXT,
ADD COLUMN     "teachingGrades" TEXT,
ADD COLUMN     "zipCode" TEXT;
