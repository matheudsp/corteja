import { Request, Response } from 'express';
import { CreateScheduleService } from '../services/CreateScheduleService';


class CreateScheduleController {
    async handle(req: Request, res: Response) {

        // const salaoId = req.salon_id

        const {
            salaoId,
            servicos,
            colaboradores,
            dias,
            horarioInicio,
            horarioFim

        } = req.body;

        const service = new CreateScheduleService();

        const controller = await service.execute({
            salaoId,
            servicos,
            colaboradores,
            dias,
            horarioInicio,
            horarioFim
        });

        return res.json(controller)

    }
}

export { CreateScheduleController }