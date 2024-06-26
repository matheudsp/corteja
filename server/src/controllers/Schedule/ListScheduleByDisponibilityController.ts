import { Request, Response } from 'express';
import { ListScheduleByDisponibilityService } from '../../services/Schedule/ListScheduleByDisponibilityService';



class ListScheduleByDisponibilityController {
    async handle(req: Request, res: Response) {


        const {
            salaoId,
            servicoId, 
            data
        } = req.body;

        const service = new ListScheduleByDisponibilityService();

        const controller = await service.execute({
            salaoId,
            servicoId, 
            data
        });

        return res.json(controller)

    }
}

export { ListScheduleByDisponibilityController }