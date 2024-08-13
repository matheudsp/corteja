import prismaClient from "../../prisma";
import { issueTokens } from "../../middlewares/issueTokens";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
  }
  


class GetNewTokensService {
    async execute({ refreshToken }: any) {

        const result = verify(
            refreshToken,
            process.env.JWT_SECRET
        ) as Payload;

        if (!result) throw new Error('Invalid refresh token')

        const user = await prismaClient.cliente.findFirst({
            where:{
                id: result.sub
            },
            select:{
                email:true,
                id:true
            }
        })

        const tokens = await issueTokens(user.id)

        //apos cumprir as condicoes
        return {
            user,
            ...tokens
        }
    }
}

export { GetNewTokensService }