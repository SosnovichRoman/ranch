import { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native"
import client from "../../components/SanityClient/client";
import { userQuery } from "../../utils/data";
import ScheduleTabs from "../../components/Schedule/ScheduleTabs";
import { useNavigation, useSearchParams } from "expo-router";
import { Text } from "@ui-kitten/components";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { scheduleQuery } from "../../utils/data";


const UserScheduleScreen = () => {

    const userId = useSearchParams()?.id;
    const [schedule, setSchedule] = useState();
    const [fetchingError, setFetchingError] = useState(false);
    const navigator = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchSchedule();
    }, [userId])

    const fetchSchedule = async () => {
        try {
            const user = await client.fetch(userQuery(userId));
            navigator.setOptions({ title: 'Расписание ' + user?.name });
            if (user) setSchedule(await client.fetch(scheduleQuery(user?._id)));

        } catch (error) {
            console.log('error:', error)
            Toast.show({
                type: 'error',
                text1: 'Ошибка загрузки данных'
            })
            setFetchingError(true)
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await fetchSchedule();
        setRefreshing(false)
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
            <ScheduleTabs refreshing={refreshing} onRefresh={onRefresh} schedule={schedule} />
        </SafeAreaView>
    )

}

export default UserScheduleScreen