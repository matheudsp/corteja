import {Request, Response} from 'express';
import { UpdateCollaboratorService } from '../../services/Collaborator/UpdateCollaboratorService';


class UpdateCollaboratorController{
    async handle(req: Request, res: Response){
        
        const colaboradorId = req.params.id
        const { nome, email, telefone, foto, descricao, servicos, status} = req.body;

        const service = new UpdateCollaboratorService();

        const controller = await service.execute({
            colaboradorId,
            nome,
            foto,
            email,
            telefone,
            descricao,
            servicos,
            status
        });

        return res.json(controller)

    }
}

export { UpdateCollaboratorController }