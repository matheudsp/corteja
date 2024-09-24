/*
  Warnings:

  - You are about to drop the column `image` on the `salon` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_path` on the `salonService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "avatar_path" SET DEFAULT '/uploads/users/default-avatar.png';

-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "avatar_path" SET DEFAULT '/uploads/employees/default-avatar.png';

-- AlterTable
ALTER TABLE "salon" DROP COLUMN "image",
ADD COLUMN     "logo_path" TEXT NOT NULL DEFAULT '/uploads/saloons/default-logo.png';

-- AlterTable
ALTER TABLE "salonService" DROP COLUMN "avatar_path",
ADD COLUMN     "image_path" TEXT DEFAULT '/uploads/salon-services/default-image.png';
