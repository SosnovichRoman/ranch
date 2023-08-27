import { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native"
import client from "../../components/SanityClient/client";
import { unapprovedScheduleQuery } from "../../utils/data";
import ScheduleTabs from "../../components/Schedule/ScheduleTabs";
import { Text } from "@ui-kitten/components";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { StyleSheet } from "react-native";

const UnapprovedActivitiesScreen = () => {

    const [schedule, setSchedule] = useState();
    const [fetchingError, setFetchingError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchSchedule();
    }, [])

    const fetchSchedule = async () => {
        try {
            setFetchingError(false);
            setSchedule(await client.fetch(unapprovedScheduleQuery))
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
        setRefreshing(true);
        await fetchSchedule();
        setRefreshing(false);
    }

    if (fetchingError) return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={styles.emptyContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text>Не удалось загрузить информацию</Text>
            </ScrollView>
        </SafeAreaView >
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScheduleTabs refreshing={refreshing} onRefresh={onRefresh} schedule={schedule} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UnapprovedActivitiesScreen