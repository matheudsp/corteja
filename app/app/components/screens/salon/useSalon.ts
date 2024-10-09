import { useQuery } from '@tanstack/react-query'

import { useTypedRoute } from '@/hooks/useTypedRoute'

import { SalonService } from '@/services/salon.service'

export const useSalon = () => {
	const { params } = useTypedRoute<'Salon'>()

	const { isLoading, data: salon } = useQuery({
		queryKey: ['get salon by id', params.id],
		queryFn: () => SalonService.getById(params.id),
		retry: false,
	})
	
	return { isLoading, salon }
}