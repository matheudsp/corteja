import prismaClient from "../../prisma"
import { hash } from 'bcryptjs';

interface Coordenadas {
    tipo: string;
    coordenadas: number[];
}

interface Request {
    nome: string;
    foto: string;
    capa: string;
    telefone?: string;
    email: string;
    senha: string;
    enderecoCidade: string;
    enderecoUf: string;
    enderecoCep: string;
    enderecoNumero: string;
    enderecoPais: string;
    geoCoordenadas: Coordenadas;

    
}


class CreateSalonService {
    async execute({ 
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
        geoCoordenadas}: Request){
        
        // validacao
        if(!nome || !email || !senha || !enderecoCidade || !enderecoUf || !enderecoCep || !enderecoNumero) {
            throw new Error("Preencha todos os campos.")
        }

        // valida se já existe conta
        const salaoExistente = await prismaClient.salao.findFirst({
            where:{
                email: email
            }
        })



        if (salaoExistente) {
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

        const salon = await prismaClient.salao.create({
            data: {
                nome: nome,
                foto:foto,
                capa:capa,
                email: email, 
                senha: senhaHash,
                enderecoCidade: enderecoCidade,
                enderecoUf:enderecoUf,
                enderecoCep:enderecoCep,
                enderecoNumero: enderecoNumero,
                enderecoPais: 'Brasil',
                telefone: telefone,
                geoCoordenadas: {
                    create: {
                        tipo: geoCoordenadas.tipo,
                        coordenadas: geoCoordenadas.coordenadas
                    }
                }
            },
            select: {
                id: true,
            },
        })

        return salon
        
    }
}

export {CreateSalonService}