import {Request, Response} from 'express';
import { ListSalonByClientService } from '../../services/Client/ListSalonByClientService';


class ListSalonByClientController{
    async handle(req: Request, res: Response){
        const clientId = req.client_id

        const service = new ListSalonByClientService();

        const info = await service.execute(clientId);

        return res.json(info)

    }
}

export { ListSalonByClientController }