/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Salao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Salao" DROP CONSTRAINT "Salao_clienteId_fkey";

-- AlterTable
ALTER TABLE "Salao" DROP COLUMN "clienteId";

-- CreateTable
CREATE TABLE "Cliente_Salao" (
    "id" TEXT NOT NULL,
    "salaoId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "Cliente_Salao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_Salao_clienteId_salaoId_key" ON "Cliente_Salao"("clienteId", "salaoId");

-- AddForeignKey
ALTER TABLE "Cliente_Salao" ADD CONSTRAINT "Cliente_Salao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente_Salao" ADD CONSTRAINT "Cliente_Salao_salaoId_fkey" FOREIGN KEY ("salaoId") REFERENCES "Salao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
