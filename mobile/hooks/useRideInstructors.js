import { useQuery } from '@tanstack/react-query'
import rideInstructorsService from '../services/rideInstructors.service'

export default function useRideInstructors() {
	const rideInstructors = useQuery({
		queryKey: ['ride instructors'],
		queryFn: async () => {
			const rideInstructors = await rideInstructorsService.getAll()
			return rideInstructors
		},
	})

	return rideInstructors
}
