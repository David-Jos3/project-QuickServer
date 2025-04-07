/*
  Warnings:

  - Added the required column `customerName` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "customerName" TEXT NOT NULL;
