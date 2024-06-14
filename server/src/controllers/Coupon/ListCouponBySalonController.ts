import { Request, Response } from 'express';
import { ListCouponBySalonService } from '../../services/Coupon/ListCouponBySalonService';

class ListCouponBySalonController {
    async handle(req: Request, res: Response) {

        const salonId = req.params.id

        const service = new ListCouponBySalonService();

        const controller = await service.execute({
            salonId
        });

        return res.json(controller)

    }
}

export { ListCouponBySalonController }