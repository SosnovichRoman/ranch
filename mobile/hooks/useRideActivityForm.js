import useRideActivity from './useRideActivity'
import useRideSettings from './useRideSettings'

export default function useRideActivityForm(id) {
	const rideActivityQuery = useRideActivity(id)
	const rideSettingsQuery = useRideSettings()
	const { data: rideActivity } = useRideActivity(id)
	const { data: rideSettings } = useRideSettings()

	const isLoading = [rideSettingsQuery, rideActivityQuery].some(
		(query) => query.isLoading
	)

	const rideActivityForm = {
		...rideActivity,
		rideTypeIndex: rideSettings?.rideTypes?.findIndex(
			(rideType) => rideType?.name == rideActivity?.rideType
		),
		durationIndex: rideSettings?.durations?.findIndex(
			(duration) => duration?.duration == rideActivity?.duration
		),
	}
	return { rideActivityForm, rideSettings, isLoading }
}
