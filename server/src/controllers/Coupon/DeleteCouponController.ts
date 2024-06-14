import { Request, Response } from 'express';
import { DeleteCouponService } from '../../services/Coupon/DeleteCouponService';


class DeleteCouponController {
    async handle(req: Request, res: Response) {

        const couponId = req.params.id

        const service = new DeleteCouponService();

        const controller = await service.execute({
            couponId
        });

        return res.json(controller)

    }
}

export { DeleteCouponController }