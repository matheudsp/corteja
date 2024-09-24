/*
  Warnings:

  - You are about to drop the `Customer_Salon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer_Salon" DROP CONSTRAINT "Customer_Salon_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Customer_Salon" DROP CONSTRAINT "Customer_Salon_salonId_fkey";

-- AlterTable
ALTER TABLE "salon" ADD COLUMN     "customer_id" TEXT;

-- DropTable
DROP TABLE "Customer_Salon";

-- AddForeignKey
ALTER TABLE "salon" ADD CONSTRAINT "salon_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
