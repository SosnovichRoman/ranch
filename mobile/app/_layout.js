import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack initialRouteName='home'>
        <Stack.Screen name='home' />
        <Stack.Screen name='login' />
    </Stack>
  )
}

export default Layout