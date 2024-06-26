import { Request, Response } from 'express';
import { FilterSalonService } from '../../services/Salon/FilterSalonService';


class FilterSalonController {
    async handle(req: Request, res: Response) {
        const {
            coordenadas,
            nome,
            cidade,
            estado
        } = req.body;

        const service = new FilterSalonService();

        const controller = await service.execute({
            coordenadas,
            nome,
            cidade,
            estado
        });

        return res.json(controller)

    }
}

export { FilterSalonController }