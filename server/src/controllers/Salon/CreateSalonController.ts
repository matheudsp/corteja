import { Request, Response } from 'express';
import { CreateSalonService } from '../../services/Salon/CreateSalonService';


class CreateSalonController {
    async handle(req: Request, res: Response) {
        const {
            nome,
            email,
            senha,
            telefone,
            enderecoPais,
            enderecoCidade,
            enderecoUf,
            enderecoCep,
            enderecoNumero,
            enderecoBairro,
            enderecoRua } = req.body;

        let foto: string | undefined = undefined;
        let capa: string | undefined = undefined;

        if (req.files) {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            if (files.foto) {
                foto = files.foto[0].filename;
            }
            if (files.capa) {
                capa = files.capa[0].filename;
            }
        }

        // Extrai geoCoordenadas do form-data
        const geoCoordenadasTipo = req.body['geoCoordenadas.tipo'];
        const geoCoordenadasCoordenadas = req.body['geoCoordenadas.coordenadas'];

        // Monta o objeto de geoCoordenadas
        const geoCoordenadas = {
            tipo: geoCoordenadasTipo,
            coordenadas: geoCoordenadasCoordenadas.split(',').map((coord: string) => parseFloat(coord.trim()))
        };


        const service = new CreateSalonService();

        const controller = await service.execute({
            nome,
            foto,
            capa,
            email,
            senha,
            telefone,
            enderecoCidade,
            enderecoCep,
            enderecoNumero,
            enderecoBairro,
            enderecoRua,
            enderecoUf,
            geoCoordenadas,
            enderecoPais
        });

        return res.json(controller)

    }
}


export { CreateSalonController }