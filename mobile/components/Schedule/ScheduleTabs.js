import { Divider, Text, ViewPager } from '@ui-kitten/components'
import dayjs from 'dayjs'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ScheduleList from '../../components/Schedule/ScheduleList'

const ScheduleTabs = ({ schedule, refreshing, onRefresh }) => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const dates = datesInRange(dayjs(), 30)

	function datesInRange(startDate, daysCount) {
		let date = startDate
		let dateArray = []
		for (let i = 0; i < daysCount; i++) {
			dateArray.push(date)
			date = date.add(1, 'day')
		}
		return dateArray
	}

	return (
		<ViewPager
			style={{ flex: 1 }}
			selectedIndex={selectedIndex}
			onSelect={(index) => setSelectedIndex(index)}
		>
			{dates?.map((date) => (
				<View style={{ flex: 1 }} key={date.format('DD.MM.YYYY')}>
					<View style={styles.tabHeader}>
						<Text style={styles.tabTitle}>{date.format('DD.MM.YYYY')}</Text>
						<Divider style={styles.headerDivider} />
					</View>
					<ScheduleList
						refreshing={refreshing}
						onRefresh={onRefresh}
						date={date}
						schedule={schedule}
					/>
				</View>
			))}
		</ViewPager>
	)
}

const styles = StyleSheet.create({
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabHeader: {
		width: '100%',
		alignItems: 'center',
	},
	tabTitle: {
		fontSize: 16,
		fontWeight: 500,
		paddingVertical: 12,
	},
	headerDivider: {
		width: '100%',
	},
})

export default ScheduleTabs
