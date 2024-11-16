import rideSettingsService from '@/services/rideSettings.service'
import { useQuery } from '@tanstack/react-query'

export default function useRideSettings() {
	const settings = useQuery({
		queryKey: ['ride-settings'],
		queryFn: async () => {
			const rideSettings = await rideSettingsService.getRideSettings()
			return rideSettings
		},
	})

	return settings
}
