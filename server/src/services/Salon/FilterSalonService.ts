import prismaClient from "../../prisma";
import * as turf from "@turf/turf";

interface Request {
    nome?: string,
    coordenadas?: number[],
    cidade?: string,
    estado?: string
}

class FilterSalonService {
    async execute({ nome, coordenadas, cidade, estado }: Request) {
        
        const searchConditions: any = {};

        if (nome) {
            searchConditions.nome = nome;
        }
        if (cidade) {
            searchConditions.enderecoCidade = cidade;
            searchConditions.enderecoUf = estado;
        }

        const salaos = await prismaClient.salao.findMany({
            where: searchConditions,
            select: {
                id: true,
                foto: true,
                nome: true,
                enderecoCidade: true,
                enderecoUf: true,
                enderecoNumero: true,
                enderecoCep: true,

                agendamentos: false,
                enderecoPais: false,
                senha: false,
                geoCoordenadas: {
                    select: {
                        id: false,
                        tipo: false,
                        coordenadas: true
                    }
                }
            }
        })


        if (coordenadas) {
            const salaosComDistancia = salaos.map(salao => {
                if (salao.geoCoordenadas.coordenadas) {
                    const distanciaSalao = turf.distance(
                        turf.point(salao.geoCoordenadas.coordenadas),
                        turf.point(coordenadas), //coordenadas que serão recebidas do usuario
                        { units: "kilometers" }
                    ).toFixed(1);

                    return {
                        ...salao,
                        distanciaSalao: parseFloat(distanciaSalao)
                    };
                }
                return null; //retorna null se nao existir coordenadas
            }).filter(salao => salao && salao.distanciaSalao <= 60);


            return salaosComDistancia;
        }

            return salaos


    }
}

export { FilterSalonService };