import { Stack } from 'expo-router'
import React from 'react'
import { Drawer } from 'expo-router/drawer';

const Layout = () => {
  return (
    <Drawer />
    // <Stack initialRouteName='home'>
    //     <Stack.Screen name='home' />
    //     <Stack.Screen name='login' />
    // </Stack>
  )
}

export default Layout