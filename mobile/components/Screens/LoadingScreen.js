import { View, Text } from 'react-native'
import { readUser } from "../../utils/userStorage"
import { useEffect, useState } from "react"
import React from 'react'
import { useRouter } from "expo-router"

const LoadingScreen = () => {

    const router = useRouter()

    useEffect(() => {
        readUserData();
    }, [])

    const readUserData = async () => {
        const user = await readUser();
        if(user) router.replace({ pathname: 'userSchedule', params: { id: user?._id } })
        else router.replace('/login')
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>LoadingScreen</Text>
        </View>
    )
}

export default LoadingScreen