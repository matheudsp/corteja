import { Request, Response } from 'express';
import { DeleteServiceService } from '../../services/Service/DeleteServiceService';


class DeleteServiceController {
    async handle(req: Request, res: Response) {

        const serviceId = req.params.id

        const service = new DeleteServiceService();

        const controller = await service.execute({
            serviceId
        });

        return res.json(controller)

    }
}

export { DeleteServiceController }