import { Request, Response } from 'express';
import { CreateCouponService } from '../services/CreateCouponService';


class CreateCouponController {
    async handle(req: Request, res: Response) {

        // const salaoId = req.salon_id
        
        const { salaoId, valor, dataInicio, dataFim, codigo, quantidadeUso,
            usosRestantes
        } = req.body;

        const service = new CreateCouponService();

        const controller = await service.execute({
            salaoId, valor, dataInicio, dataFim, codigo, quantidadeUso,
            usosRestantes
        });

        return res.json(controller)

    }
}

export { CreateCouponController }