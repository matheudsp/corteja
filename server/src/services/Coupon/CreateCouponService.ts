import prismaClient from "../../prisma";

interface Request {
    salaoId: string,
    valor: number,
    dataInicio?: string,
    dataFim?: string, 
    codigo: string,
    quantidadeUso: number,
    usosRestantes: number,

}

class CreateCouponService{
    async execute({
        salaoId, valor, dataInicio, dataFim, codigo, quantidadeUso,
        usosRestantes
    }: Request) {

        const codigoExistente = await prismaClient.cupom.findFirst({
            where:{
                codigo: codigo
            }
        })

        if (codigoExistente) {
            throw new Error("Código do cupom existente.")
        }

        const service = await prismaClient.cupom.create({
            data:{  
                salaoId: salaoId,
                dataInicio: new Date(dataInicio) , 
                dataFim: new Date(dataFim),
                valor: valor,
                codigo: codigo, 
                quantidadeUso: quantidadeUso,
                usosRestantes: usosRestantes 
            },
            select:{
                id: true
            }
        })

        return service;
    }
}

export {CreateCouponService};