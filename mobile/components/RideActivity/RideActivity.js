import {
	Button,
	Datepicker,
	Divider,
	IndexPath,
	Input,
	Select,
	SelectItem,
	Text,
	Toggle,
} from '@ui-kitten/components'
import dayjs from 'dayjs'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import uuid from 'react-native-uuid'
import useRideActivityForm from '../../hooks/useRideActivityForm'
import { useUpdateRideActivity } from '../../hooks/useUpdateRideActivity'

const RideActivity = () => {
	const params = useLocalSearchParams()

	const [selectedIndexRideType, setSelectedIndexRideType] = useState(
		new IndexPath(0)
	)
	const [selectedIndexRideDuration, setSelectedIndexRideDuration] = useState(
		new IndexPath(0)
	)
	const [date, setDate] = useState(new Date())
	const [selectedIndexInstructor, setSelectedIndexInstructor] = useState([
		new IndexPath(0),
	])

	// -----------------------------------------------------------------------------------------------------

	const { rideActivityForm, isLoading, rideSettings, rideInstructors } =
		useRideActivityForm(params.id)
	const { mutate, isPending } = useUpdateRideActivity()
	const [form, setForm] = useState(rideActivityForm)

	useEffect(() => {
		if (!isLoading) {
			setForm(rideActivityForm)
			setSelectedIndexRideType(new IndexPath(rideActivityForm?.rideTypeIndex))
			setSelectedIndexRideDuration(
				new IndexPath(rideActivityForm?.durationIndex)
			)
			setSelectedIndexInstructor(rideActivityForm?.instructorIndex)
		}
	}, [isLoading])

	const submit = () => {
		const instructors = rideInstructors
			.filter((val, index) =>
				selectedIndexInstructor
					.map((selectedIndex) => selectedIndex.row)
					.includes(index)
			)
			.map((val) => {
				return {
					_ref: val?._id,
					_key: uuid.v4(),
				}
			})
		const doc = {
			clientName: form.clientName,
			clientPhone: form.clientPhone,
			personCount: Number(form?.personCount),
			startTime: Number(form?.startTime),
			endTime: Number(form?.endTime),
			date: dayjs(form?.date).format('YYYY-MM-DD'),
			approved: form.approved,
			rideType: rideSettings?.rideTypes[selectedIndexRideType.row].name,
			duration: rideSettings?.durations[selectedIndexRideDuration.row].duration,
			instructors: instructors,
		}
		mutate({ id: params.id, doc })
	}

	if (isLoading)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Загрузка...</Text>
			</View>
		)
	console.log(form)
	// if (fetchingError)
	// 	return (
	// 		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	// 			<Text>Не удалось загрузить информацию</Text>
	// 		</View>
	// 	)

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<ScrollView
				contentContainerStyle={styles.container}
				style={{ backgroundColor: 'white', flex: 1 }}
			>
				<View>
					<Text>ФИО</Text>
					<Input
						style={styles.input}
						value={form.clientName}
						onChangeText={(value) => {
							setForm({ ...form, clientName: value })
						}}
					/>
				</View>
				<View>
					<Text>Контактный номер</Text>
					<Input
						style={styles.input}
						value={form.clientPhone}
						onChangeText={(value) => {
							setForm({ ...form, clientPhone: value })
						}}
					/>
				</View>
				<View>
					<Text>Тип поездки</Text>
					<Select
						style={styles.input}
						selectedIndex={selectedIndexRideType}
						onSelect={(index) => setSelectedIndexRideType(index)}
						value={rideSettings?.rideTypes?.[selectedIndexRideType.row]?.name}
					>
						{rideSettings?.rideTypes?.map((rideType) => (
							<SelectItem title={rideType?.name} key={rideType?.name} />
						))}
					</Select>
				</View>
				<View>
					<Text>Количество человек</Text>
					<Input
						style={styles.input}
						value={form.personCount}
						onChangeText={(value) => {
							setForm({ ...form, personCount: value })
						}}
					/>
				</View>
				<View>
					<Text>Дата</Text>
					<Datepicker
						style={styles.input}
						date={date}
						onSelect={(nextDate) => setDate(nextDate)}
					/>
				</View>
				<View>
					<Text>Начало</Text>
					<Input
						style={styles.input}
						onChangeText={(val) => setForm({ ...form, startTime: val })}
						value={form.startTime}
					/>
				</View>
				<View>
					<Text>Окончание</Text>
					<Input
						style={styles.input}
						onChangeText={(val) => setForm({ ...form, endTime: val })}
						value={form.endTime}
					/>
				</View>
				<View>
					<Text>Длительность</Text>
					<Select
						style={styles.input}
						selectedIndex={selectedIndexRideDuration}
						onSelect={(index) => setSelectedIndexRideDuration(index)}
						value={
							rideSettings?.durations?.[selectedIndexRideDuration.row]?.name
						}
					>
						{rideSettings?.durations?.map((duration) => (
							<SelectItem title={duration?.name} key={duration?.name} />
						))}
					</Select>
				</View>
				{/* <View>
                <Text>
                    Описание
                </Text>
                <Input style={styles.input} value="3" />
            </View> */}
				<View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
					<Text>Подтверждено</Text>
					<Toggle
						checked={form.approved}
						onChange={(val) => setForm({ ...form, approved: val })}
					></Toggle>
				</View>
				<View>
					<Text>Инструктор</Text>
					<Select
						style={styles.input}
						multiSelect={true}
						selectedIndex={selectedIndexInstructor}
						onSelect={(index) => setSelectedIndexInstructor(index)}
						value={'Назначенные инструкторы'}
					>
						{rideInstructors?.map((instructor) => (
							<SelectItem title={instructor?.name} key={instructor?._id} />
						))}
					</Select>
				</View>
				{/* There is bug with padding bottom */}
				{/* <View style={{ height: 10 }}></View> */}
			</ScrollView>
			<View>
				<Divider style={{ width: '100%' }} />
				<View style={styles.footerContainer}>
					<Button onPress={submit}>Сохранить</Button>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 20,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	listItem: {},
	input: {
		marginTop: 8,
	},
	footerContainer: {
		padding: 20,
		backgroundColor: 'white',
	},
})

export default RideActivity
