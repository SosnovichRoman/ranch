import { IndexPath } from '@ui-kitten/components'
import useRideActivity from './useRideActivity'
import useRideInstructors from './useRideInstructors'
import useRideSettings from './useRideSettings'

export default function useRideActivityForm(id) {
	const rideActivityQuery = useRideActivity(id)
	const rideSettingsQuery = useRideSettings()
	const rideInstructorsQuery = useRideInstructors()

	const { data: rideActivity } = useRideActivity(id)
	const { data: rideSettings } = useRideSettings()
	const { data: rideInstructors } = useRideInstructors()

	const isLoading = [
		rideSettingsQuery,
		rideActivityQuery,
		rideInstructorsQuery,
	].some((query) => query.isLoading)

	const rideActivityForm = {
		...rideActivity,
		rideTypeIndex: rideSettings?.rideTypes?.findIndex(
			(rideType) => rideType?.name == rideActivity?.rideType
		),
		durationIndex: rideSettings?.durations?.findIndex(
			(duration) => duration?.duration == rideActivity?.duration
		),
		instructorIndex: rideInstructors
			?.map((instructor, index) => {
				if (
					rideActivity?.instructors
						?.map((item) => item?._id)
						?.includes(instructor?._id)
				)
					return new IndexPath(index)
			})
			.filter((item) => item != undefined),
	}
	return { rideActivityForm, rideSettings, rideInstructors, isLoading }
}
