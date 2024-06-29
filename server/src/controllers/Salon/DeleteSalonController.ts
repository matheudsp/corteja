import {Request, Response} from 'express';
import { DeleteSalonService } from '../../services/Salon/DeleteSalonService';


class DeleteSalonController{
    async handle(req: Request, res: Response){
        
        const salonId = req.params.id

        const service = new DeleteSalonService();

        const controller = await service.execute({salonId});

        return res.json(controller)

    }
}

export { DeleteSalonController }