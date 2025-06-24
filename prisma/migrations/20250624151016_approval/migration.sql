-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT',
ALTER COLUMN "email" DROP NOT NULL;
