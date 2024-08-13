import prismaClient from "../../prisma";
import {compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import { issueTokens } from "../../middlewares/issueTokens";

interface AuthRequest{
    email: string;
    senha: string;
}

class AuthUserService{
    async execute({email,senha}: AuthRequest){
        
        //verifica se o email existe no bd
        const user = await prismaClient.cliente.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            throw new Error("Email e/ou senha incorreta.")
        }

        const passwordMatch = await compare(senha, user.senha)
        
        if(!passwordMatch){
            throw new Error("Email e/ou senha incorreta.")
        }

        const tokens = await issueTokens(user.id)

        // const token = sign(
        //     {   
        //         id:user.id
        //     },
        //     process.env.JWT_SECRET,
        //     {
        //       subject: user.id,
        //       expiresIn: '30d'
        //     }
        //   )

        //apos cumprir as condicoes
        return{
            id: user.id,
            ...tokens
        }
    }
}

export { AuthUserService}