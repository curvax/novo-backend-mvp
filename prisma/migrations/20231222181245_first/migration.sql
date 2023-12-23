/*
  Warnings:

  - You are about to drop the column `additionalEmails` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isCooperadoApoiador` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `municipalInscription` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stateInscription` on the `users` table. All the data in the column will be lost.
  - Added the required column `activityLevel` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TriagemProdist" DROP CONSTRAINT "TriagemProdist_idCooperado_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "additionalEmails",
DROP COLUMN "company",
DROP COLUMN "isCooperadoApoiador",
DROP COLUMN "municipalInscription",
DROP COLUMN "phone",
DROP COLUMN "stateInscription",
ADD COLUMN     "activityLevel" TEXT NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "meals" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
