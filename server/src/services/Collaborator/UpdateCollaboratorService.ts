import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';


interface Request {
    colaboradorId: string;
    foto?: string;
    nome?: string;
    status?: 'Ativo' | 'Inativo';
    telefone?: string;
    email?: string;
    descricao?: string;
    servicos?: string[];
    removerFoto?: boolean;
}

class UpdateCollaboratorService {
    async execute({ nome, telefone, status, email, colaboradorId, foto, descricao, servicos, removerFoto }: Request) {

        const colaboradorExistente = await prismaClient.colaborador.findFirst({
            where: {
                id: colaboradorId
            },
            select: {
                foto: true
            }
        })

        if (!colaboradorExistente) {
            throw new Error('Falha ao encontrar usuário.')
        }

        const updateData: any = {};

        if (removerFoto && colaboradorExistente.foto) {
            const oldImagePath = path.resolve(__dirname, '..', '..', '..', 'uploads', colaboradorExistente.foto);
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath); // Exclui a imagem anterior
                } catch (error) {
                    console.error(`Erro ao excluir a imagem antiga: ${error.message}`);
                }
            }
            updateData.foto = null; // Remove a referência da foto no banco de dados
        } else if (foto !== undefined) {
            if (colaboradorExistente.foto) {
                const oldImagePath = path.resolve(__dirname, '..', '..', '..', 'uploads', colaboradorExistente.foto);
                if (fs.existsSync(oldImagePath)) {
                    try {
                        fs.unlinkSync(oldImagePath); // Exclui a imagem anterior
                    } catch (error) {
                        console.error(`Erro ao excluir a imagem antiga: ${error.message}`);
                    }
                }
            }
            updateData.foto = foto;
        }

        // if (foto !== undefined) updateData.foto = foto;
        if (nome !== undefined) updateData.nome = nome;
        if (status !== undefined) updateData.status = status;
        if (telefone !== undefined) updateData.telefone = telefone;
        if (email !== undefined) updateData.email = email;
        if (descricao !== undefined) updateData.descricao = descricao;
        if (servicos && servicos.length > 0) {
            updateData.servicos = {
                deleteMany: {}, // Limpa conexoes existentes
                create: servicos.map(servicoId => ({
                    servico: {
                        connect: { id: servicoId }
                    }
                })),
            };
        } else if (servicos !== undefined) {
            // Se um array vazio foi passado, remove todas as conexões de serviço
            updateData.servicos = {
                deleteMany: {}
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