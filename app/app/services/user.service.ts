import { IUser } from '@/types/user.interface'

import { getUsersUrl } from '@/config/api.config'

import { request } from './api/request.api'

export const UserService = {
	async getProfile() {
		return request<IUser>({
			url: getUsersUrl('/profile'),
			method: 'GET'
		})
	},

	async toggleFavorite(salonId: string) {
		return request<IUser>({
			url: getUsersUrl(`/profile/favorites/${salonId}`),
			method: 'PATCH'
		})
	}
}