import { useMutation, useQueryClient } from '@tanstack/react-query'
import rideActivityService from '../services/rideActivity.service'

export function useUpdateRideActivity() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update activity'],
		mutationFn: (id) => rideActivityService.update(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['ride activities'] })
		},
	})

	return { mutate, isPending }
}
