import { Text } from '@ui-kitten/components'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
} from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import client from '../../components/SanityClient/client'
import ScheduleTabs from '../../components/Schedule/ScheduleTabs'
import { scheduleQuery } from '../../utils/data'

const UserScheduleScreen = () => {
	const userId = useSearchParams()?.id
	const userName = useSearchParams()?.name
	const [schedule, setSchedule] = useState()
	const [fetchingError, setFetchingError] = useState(false)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		fetchSchedule()
	}, [userId])

	const fetchSchedule = async () => {
		try {
			setFetchingError(false)
			setSchedule(await client.fetch(scheduleQuery(userId)))
		} catch (error) {
			console.log('error:', error)
			Toast.show({
				type: 'error',
				text1: 'Ошибка загрузки данных',
			})
			setFetchingError(true)
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await fetchSchedule()
		setRefreshing(false)
	}

	if (fetchingError)
		return (
			<>
				<Stack.Screen options={{ title: userName }} />
				<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
					<ScrollView
						contentContainerStyle={styles.emptyContainer}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
					>
						<Text>Не удалось загрузить информацию</Text>
					</ScrollView>
				</SafeAreaView>
			</>
		)

	return (
		<>
			<Stack.Screen options={{ title: userName }} />
			<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
				<ScheduleTabs
					refreshing={refreshing}
					onRefresh={onRefresh}
					schedule={schedule}
				/>
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default UserScheduleScreen
