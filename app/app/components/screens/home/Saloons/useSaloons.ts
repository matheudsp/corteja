import { useMutation, useQuery } from '@tanstack/react-query'

import { SalonService } from '@/services/salon.service'




export const useSaloons = (longitude: number, latitude: number, distanceLimit: number) => {
	const { data: saloons, isLoading } = useQuery({
		queryKey: ['get saloons nearest', longitude, latitude, distanceLimit],
		queryFn: () => SalonService.aroundYou({coordinates:[latitude, longitude], distanceLimit}),
		select: (data: any[]) => data.slice(0, 4)
	})

	return { saloons, isLoading }
}