import prismaClient from "../../prisma";
import * as turf from "@turf/turf";
import { isOpened as checkIsOpened } from "../../utils/util";

class DetailSalonService {
    async execute(salonId: string) {
        const salao = await prismaClient.salao.findUnique({
            where: {
                id: salonId
            },
            select:{
                agendamentos:false,
                enderecoPais:false,
                enderecoCep:false,
                senha:false,
                enderecoUf:false,
                geoCoordenadas:{
                    select:{
                        id:false,
                        tipo:false,
                        coordenadas:true
                    }
                }
            }
        })

        const distanciaSalao = turf.distance( 
            turf.point(salao.geoCoordenadas.coordenadas),
            turf.point([-6.7688238527523845, -43.02628642407135]), //coordenadas que serão recebidas do usuario
            {units: "kilometers"}
        ).toFixed(1)
                
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

            
        const service = {...salao, distanciaSalao, isOpened: salonIsOpened}
        return service;
    }
}

export { DetailSalonService };