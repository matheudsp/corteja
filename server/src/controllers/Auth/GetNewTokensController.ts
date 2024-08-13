import { Request, Response } from "express";

import { GetNewTokensService } from "../../services/Auth/getNewTokensService";

class GetNewTokensController {
    async handle(req: Request, res: Response) {
        // Receber o token
        const authToken = req.headers.authorization;

        const [, token] = authToken.split(" ")

        const getNewTokenService = new GetNewTokensService();

        const auth = await getNewTokenService.execute(
            token
        )

        return res.json(auth)
    }
}

export { GetNewTokensController }