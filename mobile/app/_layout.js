import { Stack } from 'expo-router'
import React from 'react'
import Providers from '../providers/Providers'

const StackLayout = () => {
	return (
		<Providers>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='login' options={{ title: 'Вход в аккаунт' }} />
				<Stack.Screen name='loading' options={{ headerShown: false }} />
				<Stack.Screen name='index' options={{ headerShown: false }} />
			</Stack>
		</Providers>
	)
}

export default StackLayout
