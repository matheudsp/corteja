import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import {hash, verify} from 'argon2'
import { Customer } from '@prisma/client'
import {faker} from '@faker-js/faker'
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private userService: UserService
    ) {}

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto)
        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async getNewTokens(refreshTokens: string) {
        const result = await this.jwt.verifyAsync(refreshTokens)
        if(!result) throw new UnauthorizedException("Erro de atualização com token")
        
        const user = await this.userService.getById(result.id)

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async register(dto: AuthDto){
        const oldUser = await this.prisma.customer.findUnique({
            where: {
                email: dto.email
            }
        })

        if (oldUser) throw new BadRequestException('Usuário existente')

        const user = await this.prisma.customer.create({
            data:{
                email: dto.email,
                name: faker.person.firstName(),
                avatarPath: faker.image.avatar(),
                phone: faker.phone.number(),
                password: await hash(dto.password)
            
            }
        })

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    private async issueTokens(userId: string) {
        const data = {id: userId}

        const accessToken =  this.jwt.sign(data, {
            expiresIn: '1h'
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        })

        return { accessToken, refreshToken }
    }

    private returnUserFields(user: Partial<Customer>) {
        return{
            id: user.id,
            email: user.email
        }
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.prisma.customer.findUnique({
            where: { 
                email: dto.email
            }
        })

        if (!user) throw new NotFoundException('Usuário não encontrado')
        
        const isValid = await verify(user.password, dto.password)

        if(!isValid) throw new UnauthorizedException('Senha incorreta.')
        
        return user
    }

}
