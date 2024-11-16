import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Button, Divider, Text } from '@ui-kitten/components'
import { Link } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import client from '../../components/SanityClient/client'
import { userListQuery } from '../../utils/data'
import { clearUser, readUser } from '../../utils/userStorage'

const Layout = () => {
	const [user, setUser] = useState()
	const [userList, setUserList] = useState([])

	useEffect(() => {
		readUser().then((data) => {
			setUser(data)
		})
		client.fetch(userListQuery).then((data) => setUserList(data))
	}, [])

	const accountExit = (props) => {
		clearUser()
		props.navigation.navigate('login')
	}

	return (
		<Drawer
			screenOptions={{
				headerStyle: {
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,

					elevation: 5,
				},
			}}
			drawerContent={(props) => {
				return (
					<View style={{ justifyContent: 'space-between', flex: 1 }}>
						<DrawerContentScrollView {...props}>
							<View style={{ padding: 20 }}>
								<Image
									source={require('../../assets/horse.png')}
									style={{ width: 60, height: 60 }}
								/>
							</View>
							{user?.role?.name == 'admin' && (
								<>
									<TouchableOpacity style={styles.drawerItem}>
										<Text category='s1'>
											<Link href={`/unapprovedActivities`}>
												Неподтвержденные заявки
											</Link>
										</Text>
									</TouchableOpacity>
									<Divider />
									<TouchableOpacity style={styles.drawerItem}>
										<Text category='s1'>
											<Link href={`/lastActivities`}>Последние заявки</Link>
										</Text>
									</TouchableOpacity>
									<Divider />
									{/* <TouchableOpacity style={styles.drawerItem}>
                                        <Text category='s1'><Link href={`???`}>График работы</Link></Text>
                                    </TouchableOpacity>
                                    <Divider /> */}
									{/* <TouchableOpacity style={styles.drawerItem}>
                                        <Text category='s1'><Link href={`userSchedule/0`}>Полное расписание</Link></Text>
                                    </TouchableOpacity> */}
									<Divider />
									{userList.map((user) => (
										<View key={user?._id}>
											<TouchableOpacity style={styles.drawerItem}>
												<Text category='s1'>
													<Link
														href={{
															pathname: 'userSchedule',
															params: { id: user?._id, name: user?.name },
														}}
													>
														Расписание {user?.name}
													</Link>
												</Text>
											</TouchableOpacity>
											<Divider />
										</View>
									))}
								</>
							)}

							<TouchableOpacity style={styles.drawerItem}>
								<Text category='s1'>
									<Link
										href={{
											pathname: 'userSchedule',
											params: { id: user?._id, name: user?.name },
										}}
									>
										Моё расписание
									</Link>
								</Text>
							</TouchableOpacity>
							<Divider />
						</DrawerContentScrollView>
						<Button onPress={() => accountExit(props)} style={{ margin: 20 }}>
							Выйти
						</Button>
					</View>
				)
			}}
		>
			<Drawer.Screen name='userSchedule' />
			{/* <Drawer.Screen name='rideBusySchedule' options={{ title: "График работы" }} /> */}
			<Drawer.Screen
				name='unapprovedActivities'
				options={{ title: 'Неподтвержденные заявки' }}
			/>
			<Drawer.Screen
				name='lastActivities'
				options={{ title: 'Последние заявки' }}
			/>
		</Drawer>
	)
}

const styles = StyleSheet.create({
	drawerItem: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		cursor: 'pointer',
	},
})

export default Layout
