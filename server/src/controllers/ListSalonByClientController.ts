import {Request, Response} from 'express';
import { ListSalonByClientService } from '../services/ListSalonByClientService';
import prismaClient from '../prisma';

class ListSalonByClientController{
    async handle(req: Request, res: Response){
        const clientId = req.clientId

        const service = new ListSalonByClientService();

        const info = await service.execute(clientId);

        return res.json(info)

    }
}

export { ListSalonByClientController }