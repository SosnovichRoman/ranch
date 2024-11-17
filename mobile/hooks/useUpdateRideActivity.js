import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import rideActivityService from '../services/rideActivity.service'

export function useUpdateRideActivity() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update activity'],
		mutationFn: ({ id, doc }) => rideActivityService.update(id, doc),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['ride activities'] })

			Toast.show({
				type: 'success',
				text1: 'Сохранено',
			})
		},
		onError(error) {
			Toast.show({
				type: 'error',
				text1: 'Ошибка при сохранении',
			})
			console.log(error)
		},
	})

	return { mutate, isPending }
}
