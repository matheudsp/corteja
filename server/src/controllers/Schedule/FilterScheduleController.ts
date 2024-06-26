import { Request, Response } from 'express';
import { FilterScheduleService } from '../../services/Schedule/FilterScheduleService';



class FilterScheduleController {
    async handle(req: Request, res: Response) {


        const {
            salaoId,
            periodo
        } = req.body;

        const service = new FilterScheduleService();

        const controller = await service.execute({
            salaoId,
            periodo
        });

        return res.json(controller)

    }
}

export { FilterScheduleController }