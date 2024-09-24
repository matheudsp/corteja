import { Prisma } from '@prisma/client'

export const returnUserObject: Prisma.CustomerSelect = {
	id: true,
	email: true,
	name: true,
	password: false,
	avatarPath:true,
	favorites:true
}