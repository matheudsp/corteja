import prismaClient from "../prisma";
import { hash } from 'bcryptjs';
interface Request {
    nome: string;
    telefone?: string;
    email: string;
    senha: string;
    cpf?: string;
    
}


class CreateClientService {
    async execute({ nome, telefone, email, senha, cpf}: Request){
        
        // valida email
        if(!email) {
            throw new Error("E-mail incorreto.")
        }

        // valida se já existe conta
        const ClienteExistente = await prismaClient.cliente.findFirst({
            where:{
                email: email
            }
        })

        if (ClienteExistente) {
            throw new Error("Usuário existente.")
        }

        // medidas de protecao para senha

        if(senha.length < 6){
            throw new Error("A senha deve possuir 6 ou mais caracteres.")
        }

        if(senha === '123456'){
            throw new Error("A senha não pode ser '123456'")
        }
        
        const senhaHash = await hash(senha, 8)

        const cliente = await prismaClient.cliente.create({
            data: {
                nome: nome,
                email: email, 
                senha: senhaHash,
                cpf: cpf,
                telefone: telefone
            },
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true,
                cpf: true,
                telefone: true,
            }
        })

        return cliente
        
    }
}

export {CreateClientService}