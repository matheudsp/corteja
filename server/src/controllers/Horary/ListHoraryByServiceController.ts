import { Request, Response } from 'express';
import { ListHoraryByServiceService } from '../../services/Horary/ListHoraryByServiceService';


class ListHoraryByServiceController {
    async handle(req: Request, res: Response) {

        const {servicosIds} = req.body

        const service = new ListHoraryByServiceService();

        const controller = await service.execute({
            servicosIds
        });

        return res.json(controller)

    }
}

export { ListHoraryByServiceController }