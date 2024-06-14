import { Request, Response } from 'express';
import { CreateScheduleService } from '../../services/Schedule/CreateScheduleService';


class CreateScheduleController {
    async handle(req: Request, res: Response) {

        // const salaoId = req.salon_id

        const {
            data,
            cupomId,
            salaoId,
            servicoId,
            colaboradorId,
            clienteId
        } = req.body;

        const service = new CreateScheduleService();

        const controller = await service.execute({
            data,
            cupomId,
            salaoId,
            servicoId,
            colaboradorId,
            clienteId
        });

        return res.json(controller)

    }
}

export { CreateScheduleController }