import {Request, Response} from 'express';
import { ListAllClientsService } from '../../services/Salon/ListAllClientsService';


class ListAllClientsController{
    async handle(req: Request, res: Response){
        const salonId = req.params.id

        const service = new ListAllClientsService();

        const info = await service.execute(salonId);

        return res.json(info)

    }
}

export { ListAllClientsController }