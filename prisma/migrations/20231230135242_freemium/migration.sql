/*
  Warnings:

  - The `isSMSVerified` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isOnDebt" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "typeOfSubscription" TEXT NOT NULL DEFAULT 'none',
DROP COLUMN "isSMSVerified",
ADD COLUMN     "isSMSVerified" BOOLEAN NOT NULL DEFAULT false;
