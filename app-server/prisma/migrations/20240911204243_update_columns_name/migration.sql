/*
  Warnings:

  - You are about to drop the column `costumerId` on the `Customer_Salon` table. All the data in the column will be lost.
  - You are about to drop the column `costumerId` on the `appointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId,salonId]` on the table `Customer_Salon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Customer_Salon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer_Salon" DROP CONSTRAINT "Customer_Salon_costumerId_fkey";

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_costumerId_fkey";

-- DropIndex
DROP INDEX "Customer_Salon_costumerId_salonId_key";

-- AlterTable
ALTER TABLE "Customer_Salon" DROP COLUMN "costumerId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "costumerId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Salon_customerId_salonId_key" ON "Customer_Salon"("customerId", "salonId");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_Salon" ADD CONSTRAINT "Customer_Salon_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
