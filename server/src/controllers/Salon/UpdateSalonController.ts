import { Request, Response } from 'express';
import { UpdateSalonService } from '../../services/Salon/UpdateSalonService';


class UpdateSalonController {
    async handle(req: Request, res: Response) {

        const salaoId = req.params.id
        const {
            nome,
            email,
            senha,
            telefone,
            enderecoCidade,
            enderecoUf,
            enderecoCep,
            enderecoNumero,
            enderecoBairro,
            enderecoRua,
            removerFoto,
            removerCapa
        } = req.body;

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

        const service = new UpdateSalonService();


        const controller = await service.execute({
            salaoId,
            nome,
            email,
            senha,
            telefone,
            enderecoCidade,
            enderecoUf,
            enderecoCep,
            enderecoNumero,
            enderecoBairro,
            enderecoRua,
            geoCoordenadas,
            removerFoto: removerFoto === 'true',
            removerCapa: removerCapa === 'true'
        });

        return res.json(controller)

    }
}

export { UpdateSalonController }