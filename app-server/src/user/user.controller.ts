import { Controller, Get, Param, HttpCode, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor( private readonly userService: UserService) {}

    @Get('profile')
    @Auth()
    async getProfile(@CurrentUser('id') id: string) {
        return this.userService.getById(id)
    }

    @HttpCode(200)
    @Auth()
    @Patch('profile/favorites/:salonId')
    async toggleFavorite(
        @CurrentUser('id') id: string, //Puxa o id do token de autenticação
        @Param('salonId') salonId: string) {
            return this.userService.toggleFavorite(id, salonId)
    }
}
