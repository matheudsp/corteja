import {Request, Response} from 'express';
import { SubscribeSalonService } from '../../services/Client/SubscribeSalonService';


class SubscribeSalonController{
    async handle(req: Request, res: Response){
        const clientId = req.client_id

        const salaoId = req.params.id

        const service = new SubscribeSalonService();

        const info = await service.execute({
            clientId,
            salaoId
        });

        return res.json(info)

    }
}

export { SubscribeSalonController }