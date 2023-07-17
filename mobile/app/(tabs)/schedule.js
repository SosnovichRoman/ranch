import { useEffect, useState } from "react";
import { Link } from "expo-router"
import { View, Button, SafeAreaView } from "react-native"
import { StyleSheet } from 'react-native';
import { Layout, Text, ViewPager, TabBar, Tab, Divider } from '@ui-kitten/components';
import { readUser } from "../../utils/userStorage";
import client from "../../components/SanityClient/client";
import { scheduleQuery } from "../../utils/data";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import dayjs from "dayjs";
import ScheduleList from "../../components/Schedule/ScheduleList";


const HomeScreen = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [user, setUser] = useState();
    const [schedule, setSchedule] = useState();
    const dates = datesInRange(dayjs(), 30);

    useEffect(() => {
        readUser().then((data) => {
            if (!data) {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                        <Text category="s1">Выполните вход в аккаунт.</Text>
                    </View>
                )
            }
            else setUser(data);
        })
    }, [])

    useEffect(() => {
        if (user) fetchSchedule();
    }, [user])


    const fetchSchedule = () => {

        client.fetch(scheduleQuery(user?._id))
            .then((data) => {
                setSchedule(data);
            })
            .catch((err) => {
                console.log(err);
                Toast.show({
                    type: 'error',
                    text1: 'Не удалось загрузить расписание'
                });
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                        <Text category="s1">Не удалось загрузить расписание.</Text>
                    </View>
                )
            })
    }

    function datesInRange(startDate, daysCount) {
        let date = startDate;
        let dateArray = [];
        for (let i = 0; i < daysCount; i++) {
            dateArray.push(date);
            date = date.add(1, 'day');
        }
        return dateArray;
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ViewPager
                style={{ flex: 1 }}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
            >
                {dates?.map((date) =>
                    <View style={{ flex: 1 }}>
                        <View style={styles.tabHeader}>
                            <Text style={styles.tabTitle}>{date.format('DD.MM.YYYY')}</Text>
                            <Divider style={styles.headerDivider} />
                        </View>
                        <ScheduleList date={date} schedule={schedule} />
                    </View>
                )}
            </ViewPager>
        </SafeAreaView>



    )

}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabHeader: {
        width: '100%',
        alignItems: "center",
    },
    tabTitle: {
        fontSize: 16,
        fontWeight: 500,
        paddingVertical: 12,
    },
    headerDivider: {
        width: '100%',
    },
});


export default HomeScreen