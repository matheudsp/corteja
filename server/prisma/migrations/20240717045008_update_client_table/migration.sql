-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "nome" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Salao" ALTER COLUMN "foto" DROP NOT NULL,
ALTER COLUMN "capa" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Ativo';
