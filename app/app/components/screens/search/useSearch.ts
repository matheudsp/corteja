import { useQuery } from '@tanstack/react-query'

import { SalonService } from '@/services/salon.service'

import { useSearchForm } from './useSearchForm'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control } = useSearchForm()

	const { data: saloons, isLoading } = useQuery({
		queryKey: ['search products', debouncedSearch],
		queryFn: () => SalonService.getAll(debouncedSearch),
		enabled: !!debouncedSearch
	})

	return { saloons, isLoading, control, searchTerm }
}