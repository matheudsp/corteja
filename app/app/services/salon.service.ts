import { ISalon } from '@/types/salon.interface'

import { getSaloonsUrl } from '@/config/api.config'

import { request } from './api/request.api'
import { IFilterRequest } from '@/types/filter.interface'



export const SalonService = {
	async getAll(searchTerm?: string) {
		return request<ISalon[]>({
			url: getSaloonsUrl(''),
			method: 'GET',
			params: searchTerm
				? {
					searchTerm
				}
				: {}
		})
	},


	async geyById(id: string) {
		return request<ISalon>({
			url: getSaloonsUrl(`/by-id/${id}`),
			method: 'GET'
		})
	},



	async aroundYou(data: IFilterRequest) {

		return request<ISalon[]>({
			url: getSaloonsUrl(`/around-you/`),
			method: 'POST',
			data
		})
	},



}