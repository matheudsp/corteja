import {Request, Response} from 'express';
import { DeleteCollaboratorService } from '../../services/Collaborator/DeleteCollaboratorService';


class DeleteCollaboratorController{
    async handle(req: Request, res: Response){
        
        const colaboradorId = req.params.id

        const service = new DeleteCollaboratorService();

        const controller = await service.execute({colaboradorId});

        return res.json(controller)

    }
}

export { DeleteCollaboratorController }