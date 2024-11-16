import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import client from '../../components/SanityClient/client'
import ScheduleList from '../../components/Schedule/ScheduleList'
import { lastRideScheduleQuery } from '../../utils/data'

const LastActivitiesScreen = () => {
	const [refreshing, setRefreshing] = useState(false)
	const [schedule, setSchedule] = useState()

	useEffect(() => {
		fetchSchedule()
	}, [])

	const fetchSchedule = async () => {
		try {
			setSchedule(await client.fetch(lastRideScheduleQuery))
		} catch (err) {
			console.log(err)
			Toast.show({
				type: 'error',
				text1: 'Не удалось загрузить расписание',
			})
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await fetchSchedule()
		setRefreshing(false)
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<ScheduleList
				refreshing={refreshing}
				onRefresh={onRefresh}
				date={false}
				schedule={schedule}
			/>
		</SafeAreaView>
	)
}

export default LastActivitiesScreen
