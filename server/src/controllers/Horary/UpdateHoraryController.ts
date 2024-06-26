import { Request, Response } from 'express';
import { UpdateHoraryService } from '../../services/Horary/UpdateHoraryService';


class UpdateHoraryController {
    async handle(req: Request, res: Response) {

        const horarioId = req.params.id

        const {
            servicos,
            colaboradores,
            dias,
            horarioInicio,
            horarioFim

        } = req.body;

        const service = new UpdateHoraryService();

        const controller = await service.execute({
            horarioId,
            servicos,
            colaboradores,
            dias,
            horarioInicio,
            horarioFim
        });

        return res.json(controller)

    }
}

export { UpdateHoraryController }