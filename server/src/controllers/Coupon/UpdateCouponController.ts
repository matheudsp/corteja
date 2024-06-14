import { Request, Response } from 'express';
import { UpdateCouponService } from '../../services/Coupon/UpdateCouponService';


class UpdateCouponController {
    async handle(req: Request, res: Response) {

        const couponId = req.params.id
        
        const { valor, dataInicio, dataFim, codigo, quantidadeUso,
        } = req.body;

        const service = new UpdateCouponService();

        const controller = await service.execute({
            couponId, valor, dataInicio, dataFim, codigo, quantidadeUso
        });

        return res.json(controller)

    }
}

export { UpdateCouponController }