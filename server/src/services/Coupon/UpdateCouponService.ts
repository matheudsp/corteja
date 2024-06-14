import prismaClient from "../../prisma";

interface Request {
    valor?: number,
    dataInicio?: string,
    dataFim?: string, 
    codigo?: string,
    quantidadeUso?: number,
    couponId?: string,

}

class UpdateCouponService{
    async execute({
        couponId, valor, dataInicio, dataFim, codigo, quantidadeUso
    }: Request) {

        const cupom = await prismaClient.cupom.findUnique({
            where: { id: couponId },
            select: { quantidadeUso: true, usosRestantes: true }
        });

        let usosRestantesAtualizado = cupom.usosRestantes
        if (quantidadeUso !== undefined){
            const dif = quantidadeUso - cupom.quantidadeUso
            usosRestantesAtualizado += dif

            if (usosRestantesAtualizado < 0) {
                throw new Error("A quantidade de usos informada esgotará os cupons.");
            }
        }

        const service = await prismaClient.cupom.update({
            where:{
                id: couponId
            },
            data:{  
                dataInicio: dataInicio ? new Date(dataInicio) : undefined,
                dataFim: dataFim ? new Date(dataFim) : undefined,
                valor: valor,
                codigo: codigo, 
                quantidadeUso: quantidadeUso,
                usosRestantes: usosRestantesAtualizado
            },
            select:{
                id: true,
                quantidadeUso: true,
                usosRestantes:true
            }
        })

        return service;
    }
}

export {UpdateCouponService};