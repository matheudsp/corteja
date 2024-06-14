import prismaClient from "../../prisma";

interface Request {
    colaboradorId: string;
    foto?: string;
    nome?: string;
    status?: 'Ativo' | 'Inativo';
    telefone?: string;
    email?: string;
    descricao?: string;
    servicos?: string[];
}

class UpdateCollaboratorService {
    async execute({ nome, telefone, status, email, colaboradorId, foto, descricao, servicos }: Request) {
        const updateData: any = {};

        if (foto !== undefined) updateData.foto = foto;
        if (nome !== undefined) updateData.nome = nome;
        if (status !== undefined) updateData.status = status;
        if (telefone !== undefined) updateData.telefone = telefone;
        if (email !== undefined) updateData.email = email;
        if (descricao !== undefined) updateData.descricao = descricao;
        if (servicos && servicos.length > 0) {
            updateData.servicos = {
                deleteMany: {}, // Clear existing connections
                create: servicos.map(servicoId => ({
                    servico: {
                        connect: { id: servicoId }
                    }
                })),
            };
        }

        const collaborator = await prismaClient.colaborador.update({
            where: { id: colaboradorId },
            data: updateData,
            select: { id: true },
        });

        return collaborator;
    }
}

export { UpdateCollaboratorService };