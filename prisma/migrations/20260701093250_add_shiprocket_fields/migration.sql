/*
  Warnings:

  - A unique constraint covering the columns `[shiprocketId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shiprocketId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_shiprocketId_key" ON "Order"("shiprocketId");
