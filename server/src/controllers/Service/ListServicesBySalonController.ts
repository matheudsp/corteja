import {Request, Response} from 'express';
import { ListServicesBySalonService } from '../../services/Service/ListServicesBySalonService';

class ListServicesBySalonController{
    async handle(req: Request, res: Response){
        const salonId = req.params.id

        const service = new ListServicesBySalonService();

        const info = await service.execute(salonId);

        return res.json(info)

    }
}

export { ListServicesBySalonController }