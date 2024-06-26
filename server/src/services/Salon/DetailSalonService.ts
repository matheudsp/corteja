import prismaClient from "../../prisma";
import { isOpened as checkIsOpened } from "../../utils/util";

class DetailSalonService {
    async execute(salonId: string) {
        const salao = await prismaClient.salao.findUnique({
            where: {
                id: salonId
            },
            select:{
                id:true,
                servicos:true,
                agendamentos:false,
                enderecoPais:false,
                enderecoCep:false,
                senha:false,
                enderecoUf:false,
                colaboradores:true,
                geoCoordenadas:{
                    select:{
                        id:false,
                        tipo:false,
                        coordenadas:true
                    }
                }
            }
        })

        
        const horarios = await prismaClient.horario.findMany({
            where:{
                salaoId: salonId
            },
            select:{
                dias: true,
                horarioInicio: true,
                horarioFim: true
            }
        })

        const salonIsOpened = await checkIsOpened(horarios);

            
        const service = {...salao, isOpened: salonIsOpened}
        return service;
    }
}

export { DetailSalonService };