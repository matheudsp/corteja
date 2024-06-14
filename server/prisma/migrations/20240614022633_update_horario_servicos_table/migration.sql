-- DropForeignKey
ALTER TABLE "Horarios_Servicos" DROP CONSTRAINT "Horarios_Servicos_servicoId_fkey";

-- AddForeignKey
ALTER TABLE "Horarios_Servicos" ADD CONSTRAINT "Horarios_Servicos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
