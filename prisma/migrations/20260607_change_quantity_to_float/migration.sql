-- ChangeType quantity from INTEGER to DOUBLE PRECISION for CartItem
ALTER TABLE "CartItem" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- ChangeType quantity from INTEGER to DOUBLE PRECISION for OrderItem  
ALTER TABLE "OrderItem" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;
