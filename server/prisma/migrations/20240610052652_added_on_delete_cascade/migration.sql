-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_colaboradorId_fkey";

-- DropForeignKey
ALTER TABLE "Colaborador_Servico" DROP CONSTRAINT "Colaborador_Servico_colaboradorId_fkey";

-- DropForeignKey
ALTER TABLE "Colaborador_Servico" DROP CONSTRAINT "Colaborador_Servico_servicoId_fkey";

-- DropForeignKey
ALTER TABLE "Horarios_Colaboradores" DROP CONSTRAINT "Horarios_Colaboradores_colaboradorId_fkey";

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "Colaborador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colaborador_Servico" ADD CONSTRAINT "Colaborador_Servico_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "Colaborador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colaborador_Servico" ADD CONSTRAINT "Colaborador_Servico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horarios_Colaboradores" ADD CONSTRAINT "Horarios_Colaboradores_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "Colaborador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
