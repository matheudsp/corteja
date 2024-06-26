import { Request, Response } from 'express';
import { DeleteHoraryService } from '../../services/Horary/DeleteHoraryService';


class DeleteHoraryController {
    async handle(req: Request, res: Response) {

        const horarioId = req.params.id

        const service = new DeleteHoraryService();

        const controller = await service.execute({
            horarioId
        });

        return res.json(controller)

    }
}

export { DeleteHoraryController }