import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Customer } from '@prisma/client'

export const CurrentUser = createParamDecorator(
	(data: keyof Customer, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)