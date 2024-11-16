import { useQuery } from '@tanstack/react-query'
import rideActivityService from '../services/rideActivity.service'

export default function useRideActivity(id) {
	const rideActivity = useQuery({
		queryKey: ['ride activity'],
		queryFn: async () => {
			const rideActivity = await rideActivityService.getById(id)
			return rideActivity
		},
		initialData: {
			clientName: '',
			clientPhone: '',
			personCount: '',
			startTime: '',
			endTime: '',
			isApproved: false,
		},
	})

	return rideActivity
}
