import { ApplicationProvider } from '@ui-kitten/components'
import { Stack } from 'expo-router'
import React from 'react'
import * as eva from '@eva-design/eva';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { default as mapping } from '../mapping.json';



const StackLayout = () => {

    return (
        <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping} >
            <Stack>
                <Stack.Screen name='(tabs)' options={{headerShown: false}} />
                <Stack.Screen name='login' />
            </Stack>
            <Toast />
        </ApplicationProvider>
    )
}

export default StackLayout