import { useQuery } from '@tanstack/react-query'
import rideSettingsService from '../services/rideSettings.service'

export default function useRideSettings() {
	const settings = useQuery({
		queryKey: ['ride settings'],
		queryFn: async () => {
			const rideSettings = await rideSettingsService.get()
			return rideSettings
		},
	})

	return settings
}
