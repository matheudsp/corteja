import { Request, Response } from 'express';
import { CreateHoraryService } from '../../services/Horary/CreateHoraryService';


class CreateHoraryController {
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

        const service = new CreateHoraryService();

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

export { CreateHoraryController }