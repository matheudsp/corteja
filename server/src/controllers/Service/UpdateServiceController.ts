import { Request, Response } from 'express';
import { UpdateServiceService } from '../../services/Service/UpdateServiceService';

class UpdateServiceController {
    async handle(req: Request, res: Response) {

        const serviceId = req.params.id
        const {
            titulo,
            descricao,
            duracao,
            preco,
            recorrencia,
            foto
        } = req.body;

        const service = new UpdateServiceService();

        const controller = await service.execute({
            serviceId,
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

export { UpdateServiceController }