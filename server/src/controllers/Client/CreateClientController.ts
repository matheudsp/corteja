import {Request, Response} from 'express';
import { CreateClientService } from '../../services/Client/CreateClientService';

class CreateClientController{
    async handle(req: Request, res: Response){
        const { nome, email, senha, cpf, telefone} = req.body;

        const createClientService = new CreateClientService();

        const client = await createClientService.execute({
            nome,
            email,
            senha,
            cpf,
            telefone
        });

        return res.json(client)

    }
}

export { CreateClientController }