import {Request, Response} from 'express';
import { ListCollaboratorsBySalonService } from '../../services/Collaborator/ListCollaboratorsBySalonService';


class ListCollaboratorsBySalonController{
    async handle(req: Request, res: Response){
        
        const {salaoId} = req.body

        const service = new ListCollaboratorsBySalonService();

        const controller = await service.execute({salaoId});

        return res.json(controller)

    }
}

export { ListCollaboratorsBySalonController }