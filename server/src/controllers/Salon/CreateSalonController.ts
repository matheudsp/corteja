import {Request, Response} from 'express';
import { CreateSalonService } from '../../services/Salon/CreateSalonService';


class CreateSalonController{
    async handle(req: Request, res: Response){
        const { 
            nome, 
            foto, 
            capa, 
            email, 
            senha, 
            telefone, 
            enderecoPais,
            enderecoCidade, 
            enderecoUf, 
            enderecoCep, 
            enderecoNumero, 
            geoCoordenadas,
            enderecoBairro,
            enderecoRua } = req.body;

        const service = new CreateSalonService();

        const controller = await service.execute({
          nome, 
          foto, 
          capa, 
          email, 
          senha,
          telefone,
          enderecoCidade,
          enderecoCep,
          enderecoNumero,
          enderecoBairro,
          enderecoRua,
          enderecoUf,
          geoCoordenadas,
          enderecoPais
        });

        return res.json(controller)

    }
}

export { CreateSalonController }