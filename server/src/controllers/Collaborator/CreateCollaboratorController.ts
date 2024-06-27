import { Request, Response } from 'express';
import { CreateCollaboratorService } from '../../services/Collaborator/CreateCollaboratorService';


class CreateCollaboratorController {
    async handle(req: Request, res: Response) {

        // const salaoId = req.salon_id
        const { nome, email, telefone, descricao, servicos, salaoId } = req.body;
        let foto: string | undefined = undefined;

        if (req.file) {
            const { filename } = req.file;
            foto = filename;
        }
        // Divide a string de serviços em um array, se necessário
        let servicosArray: string[] | undefined = undefined;
        if (typeof servicos === 'string') {
            servicosArray = servicos.split(',').map(servico => servico.trim());
        } else if (Array.isArray(servicos)) {
            servicosArray = servicos;
        }
        const service = new CreateCollaboratorService();

        const controller = await service.execute({
            salaoId,
            nome,
            foto,
            email,
            telefone,
            descricao,
            servicos: servicosArray
        });

        return res.json(controller)
    }

}

export { CreateCollaboratorController }