import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface Coordenadas {
    tipo: string;
    coordenadas: number[];
}

interface Request {
    salaoId: string
    nome?: string;
    foto?: string;
    capa?: string;
    telefone?: string;
    email?: string;
    senha?: string;
    enderecoCidade?: string;
    enderecoUf?: string;
    enderecoCep?: string;
    enderecoBairro?: string,
    enderecoRua?: string,
    enderecoNumero?: string;
    enderecoPais?: string;
    geoCoordenadas?: Coordenadas;
    removerFoto?: boolean;
    removerCapa?: boolean
}

class UpdateSalonService {
    async execute({
        salaoId,
        nome,
        foto,
        capa,
        email,
        senha,
        telefone,
        enderecoCidade,
        enderecoUf,
        enderecoCep,
        enderecoNumero,
        enderecoPais,
        enderecoBairro,
        enderecoRua,
        geoCoordenadas,
        removerCapa,
        removerFoto }: Request) {

        const salaoExistente = await prismaClient.salao.findFirst({
            where: {
                id: salaoId
            },
            select: {
                foto: true,
                capa: true
            }
        })

        if (!salaoExistente) {
            throw new Error('Falha ao encontrar salão.')
        }

        const updateData: any = {};

        if (removerFoto && salaoExistente.foto) {
            const oldImagePath = path.resolve(__dirname, '..', '..', '..', 'uploads', salaoExistente.foto);
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath); // Exclui a foto anterior
                } catch (error) {
                    console.error(`Erro ao excluir a imagem antiga: ${error.message}`);
                }
            }
            updateData.foto = null; // Remove a referência da foto no banco de dados
        } else if (foto !== undefined) {
            if (salaoExistente.foto) {
                const oldImagePath = path.resolve(__dirname, '..', '..', '..', 'uploads', salaoExistente.foto);
                if (fs.existsSync(oldImagePath)) {
                    try {
                        fs.unlinkSync(oldImagePath); // Exclui a foto anterior
                    } catch (error) {
                        console.error(`Erro ao excluir a imagem antiga: ${error.message}`);
                    }
                }
            }
            updateData.foto = foto;
        }

        if (removerCapa && salaoExistente.capa) {
            const oldImagePath = path.resolve(__dirname, '..', '..', '..', 'uploads', salaoExistente.capa);
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath); // Exclui a capa anterior
                } catch (error) {
                    console.error(`Erro ao excluir a imagem antiga: ${error.message}`);
                }
            }
            updateData.capa = null; // Remove a referência da capa no banco de dados
        } else if (capa !== undefined) {
            if (salaoExistente.capa) {
                const oldImagePath = path.resolve(__dirname, '..', '..', '..', 'uploads', salaoExistente.capa);
                if (fs.existsSync(oldImagePath)) {
                    try {
                        fs.unlinkSync(oldImagePath); // Exclui a capa anterior
                    } catch (error) {
                        console.error(`Erro ao excluir a imagem antiga: ${error.message}`);
                    }
                }
            }
            updateData.capa = capa;
        }

       

        // if (foto !== undefined) updateData.foto = foto;
        // if (capa !== undefined) updateData.capa = capa;
        if (nome !== undefined) updateData.nome = nome;
        // if (senha !== undefined) updateData.senha = senha;
        if (enderecoCidade !== undefined) updateData.enderecoCidade = enderecoCidade;
        if (enderecoBairro !== undefined) updateData.enderecoBairro = enderecoBairro;
        if (enderecoCep !== undefined) updateData.enderecoCep = enderecoCep;
        if (enderecoNumero !== undefined) updateData.enderecoNumero = enderecoNumero;
        if (enderecoRua !== undefined) updateData.enderecoRua = enderecoRua;
        if (enderecoUf !== undefined) updateData.enderecoUf = enderecoUf;
        if (geoCoordenadas !== undefined) updateData.geoCoordenadas = geoCoordenadas;
        if (telefone !== undefined) updateData.telefone = telefone;
        if (email !== undefined) updateData.email = email;


        const service = await prismaClient.salao.update({
            where: { id: salaoId },
            data: updateData,
            select: { id: true },
        });


        return service;
    }
}

export { UpdateSalonService };