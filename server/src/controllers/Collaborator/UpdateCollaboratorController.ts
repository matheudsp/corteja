import { Request, Response } from 'express';
import { UpdateCollaboratorService } from '../../services/Collaborator/UpdateCollaboratorService';
import { booleanClockwise } from '@turf/turf';


class UpdateCollaboratorController {
    async handle(req: Request, res: Response) {

        const colaboradorId = req.params.id
        const { nome, email, telefone, descricao, servicos, status, removerFoto } = req.body;
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
        const service = new UpdateCollaboratorService();


        const controller = await service.execute({
            colaboradorId,
            nome,
            foto,
            email,
            telefone,
            descricao,
            servicos: servicosArray,
            status,
            removerFoto: removerFoto === 'true'
        });

        return res.json(controller)

    }
}

export { UpdateCollaboratorController }