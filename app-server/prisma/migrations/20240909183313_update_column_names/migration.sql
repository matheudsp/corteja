/*
  Warnings:

  - The values [Ativo,Inativo] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `geoCoordenadas` on the `salon` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Service', 'Salon');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Enabled', 'Disabled');
ALTER TABLE "coupon" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "customer" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "employee" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "salonService" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "customer" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "employee" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "salonService" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "coupon" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "coupon" ALTER COLUMN "status" SET DEFAULT 'Enabled';
ALTER TABLE "customer" ALTER COLUMN "status" SET DEFAULT 'Enabled';
ALTER TABLE "employee" ALTER COLUMN "status" SET DEFAULT 'Enabled';
ALTER TABLE "salonService" ALTER COLUMN "status" SET DEFAULT 'Enabled';
COMMIT;

-- AlterTable
ALTER TABLE "coupon" ALTER COLUMN "status" SET DEFAULT 'Enabled';

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "status" SET DEFAULT 'Enabled';

-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "status" SET DEFAULT 'Enabled';

-- AlterTable
ALTER TABLE "salon" DROP COLUMN "geoCoordenadas",
ADD COLUMN     "geoCoordinates" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "salonService" ALTER COLUMN "status" SET DEFAULT 'Enabled';

-- DropEnum
DROP TYPE "Tipo";
