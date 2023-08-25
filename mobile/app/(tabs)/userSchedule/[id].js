import { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native"
import client from "../../../components/SanityClient/client";
import { lastRideScheduleQuery, userQuery } from "../../../utils/data";
import ScheduleTabs from "../../../components/Schedule/ScheduleTabs";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@ui-kitten/components";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { scheduleQuery } from "../../../utils/data";


const ScheduleScreen = () => {

    const userId = useLocalSearchParams()?.id;
    const [schedule, setSchedule] = useState();
    const [fetchingError, setFetchingError] = useState(false)

    useEffect(() => {
        fetchSchedule();
    }, [])

    const fetchSchedule = async () => {
        try {
            //if userId == 0 then fetch all data
            if (userId == 0) setSchedule(await client.fetch(lastRideScheduleQuery))
            else {
                const user = await client.fetch(userQuery(userId));
                if(user) setSchedule(await client.fetch(scheduleQuery(user?._id)))
            }
            
        } catch (error) {
            console.log('error:', error)
            Toast.show({
                type: 'error',
                text1: 'Ошибка загрузки данных'
            })
            setFetchingError(true)
        }
    }

    if (fetchingError) return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Не удалось загрузить информацию</Text>
            </View>
        </SafeAreaView>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScheduleTabs schedule={schedule} />
        </SafeAreaView>
    )

}

export default ScheduleScreen