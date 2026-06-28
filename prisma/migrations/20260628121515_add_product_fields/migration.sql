/*
  Warnings:

  - You are about to drop the column `fabricCategory` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "fabricCategory",
ADD COLUMN     "FabricType" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "MainCategory" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "Material" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "SubCategory" TEXT NOT NULL DEFAULT 'Unknown';
