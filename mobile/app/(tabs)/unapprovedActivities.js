import { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native"
import { StyleSheet } from 'react-native';
import { Text, ViewPager, Divider } from '@ui-kitten/components';
import { readUser } from "../../utils/userStorage";
import client from "../../components/SanityClient/client";
import { scheduleQuery, unapprovedScheduleQuery } from "../../utils/data";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import dayjs from "dayjs";
import ScheduleList from "../../components/Schedule/ScheduleList";


const unapprovedScheduleScreen = () => {

    const [user, setUser] = useState();
    const [schedule, setSchedule] = useState();

    useEffect(() => {
        readUser().then((data) => {
            setUser(data)
        })
    }, [])

    useEffect(() => {
        if (user) fetchSchedule();
    }, [user])

    const fetchSchedule = () => {
        client.fetch(unapprovedScheduleQuery)
            .then((data) => {
                setSchedule(data);
            })
            .catch((err) => {
                console.log(err);
                Toast.show({
                    type: 'error',
                    text1: 'Не удалось загрузить расписание'
                });
            })
    }

    console.log(schedule)

    if (!user) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
            <Text category="s1">Выполните вход в аккаунт.</Text>
        </View>
    )

    if (user?.role?.name != 'admin') return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
            <Text category="s1">Доступно только администратору.</Text>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScheduleList date={false} schedule={schedule} />
        </SafeAreaView>
    )
}

export default unapprovedScheduleScreen