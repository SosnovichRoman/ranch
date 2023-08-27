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
                <Stack.Screen name='login' options={{title: 'Вход в аккаунт'}} />
                <Stack.Screen name='loading' options={{headerShown: false}} />
                <Stack.Screen name='index' options={{headerShown: false}} />
            </Stack>
            <Toast />
        </ApplicationProvider>
    )
}

export default StackLayout