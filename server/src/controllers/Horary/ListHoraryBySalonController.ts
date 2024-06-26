import { Request, Response } from 'express';
import { ListHoraryService } from '../../services/Horary/ListHoraryBySalonService';


class ListHoraryController {
    async handle(req: Request, res: Response) {

        const salaoId = req.params.id

        const service = new ListHoraryService();

        const controller = await service.execute({
           salaoId
        });

        return res.json(controller)

    }
}

export { ListHoraryController }