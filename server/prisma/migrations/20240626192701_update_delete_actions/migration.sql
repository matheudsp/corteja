/*
  Warnings:

  - Added the required column `enderecoBairro` to the `Salao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enderecoRua` to the `Salao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_salaoId_fkey";

-- DropForeignKey
ALTER TABLE "Cliente_Salao" DROP CONSTRAINT "Cliente_Salao_salaoId_fkey";

-- DropForeignKey
ALTER TABLE "Colaborador" DROP CONSTRAINT "Colaborador_salaoId_fkey";

-- DropForeignKey
ALTER TABLE "Coordenadas" DROP CONSTRAINT "Coordenadas_salaoId_fkey";

-- DropForeignKey
ALTER TABLE "Cupom" DROP CONSTRAINT "Cupom_salaoId_fkey";

-- DropForeignKey
ALTER TABLE "Horario" DROP CONSTRAINT "Horario_salaoId_fkey";

-- DropForeignKey
ALTER TABLE "Horarios_Servicos" DROP CONSTRAINT "Horarios_Servicos_horarioId_fkey";

-- DropForeignKey
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_salaoId_fkey";

-- AlterTable
ALTER TABLE "Salao" ADD COLUMN     "enderecoBairro" TEXT NOT NULL,
ADD COLUMN     "enderecoRua" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Coordenadas" ADD CONSTRAINT "Coordenadas_salaoId_fkey" FOREIGN KEY ("salaoId") REFERENCES "Salao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colaborador" ADD CONSTRAINT "Colaborador_salaoId_fkey" FOREIGN KEY ("salaoId") REFERENCES "Salao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_salaoId_fkey" FOREIGN KEY ("salaoId") REFERENCES "Salao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cupom" ADD CONSTRAINT "Cupom_salaoId_fkey" FOREIGN KEY ("salaoId") REFERENCES "Salao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_salaoId_fkey" FOREIGN KEY ("salaoId") REFERENCES "Salao"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_salaoId_fkey" FOREIGN KEY ("salaoId") REFERENCES "Salao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horarios_Servicos" ADD CONSTRAINT "Horarios_Servicos_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente_Salao" ADD CONSTRAINT "Cliente_Salao_salaoId_fkey" FOREIGN KEY ("salaoId") REFERENCES "Salao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
