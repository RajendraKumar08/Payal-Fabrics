-- Add orderedBy column to Order table
ALTER TABLE "Order" ADD COLUMN "orderedBy" TEXT NOT NULL DEFAULT 'Unknown';
