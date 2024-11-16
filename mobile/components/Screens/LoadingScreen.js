import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { readUser } from '../../utils/userStorage'

const LoadingScreen = () => {
	const router = useRouter()

	useEffect(() => {
		readUserData()
	}, [])

	const readUserData = async () => {
		const user = await readUser()
		if (user)
			router.replace({
				pathname: '/userSchedule',
				params: { id: user?._id, name: user?.name },
			})
		else router.replace('/login')
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
				<Image
					source={require('../../assets/horse.png')}
					style={{ width: 100, height: 100 }}
				/>
				<Text style={{ fontSize: 24, marginTop: 20 }}>Загрузка...</Text>
			</View>
		</SafeAreaView>
	)
}

export default LoadingScreen
