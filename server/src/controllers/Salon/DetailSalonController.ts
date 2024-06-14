import {Request, Response} from 'express';
import { DetailSalonService } from '../../services/Salon/DetailSalonService';


class DetailSalonController{
    async handle(req: Request, res: Response){
        const salonId = req.params.id

        const service = new DetailSalonService();

        const info = await service.execute(salonId);

        return res.json(info)

    }
}

export { DetailSalonController }