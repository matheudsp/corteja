import {Request, Response} from 'express';
import { CreateCollaboratorService } from '../services/CreateCollaboratorService';


class CreateCollaboratorController{
    async handle(req: Request, res: Response){
        
        // const salaoId = req.salon_id
        const { nome, email, telefone, foto, descricao, servicos, salaoId} = req.body;

        const service = new CreateCollaboratorService();

        const controller = await service.execute({
            salaoId,
            nome,
            foto,
            email,
            telefone,
            descricao,
            servicos
        });

        return res.json(controller)

    }
}

export { CreateCollaboratorController }