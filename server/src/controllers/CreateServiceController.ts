import { Request, Response } from 'express';
import { CreateServiceService } from '../services/CreateServiceService';


class CreateServiceController {
    async handle(req: Request, res: Response) {

        // const salaoId = req.salon_id
        const {
            titulo,
            descricao,
            duracao,
            preco,
            recorrencia,
            foto,
            salaoId
        } = req.body;

        const service = new CreateServiceService();

        const controller = await service.execute({
            salaoId,
            titulo,
            descricao,
            duracao,
            preco,
            recorrencia,
            foto
        });

        return res.json(controller)

    }
}

export { CreateServiceController }