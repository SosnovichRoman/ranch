import { useState, useEffect } from "react";
import { CheckBox, Datepicker, Divider, Text, Button } from "@ui-kitten/components"
import { View, StyleSheet, ScrollView } from "react-native"
import dayjs from "dayjs";
import client from "../../components/SanityClient/client";
import { busyScheduleQuery, rideHoursListQuery } from "../../utils/data";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ConverDecimalHours } from "../../utils/convert";
import uuid from 'react-native-uuid';

const rideBusySchedule = () => {

    const [date, setDate] = useState(new Date());
    const [busySchedule, setBusySchedule] = useState({
        _type: 'busySchedule',
        date: dayjs(date).format('YYYY-MM-DD'),
        busyHours: []
    });
    const [rideHoursList, setRideHoursList] = useState();

    useEffect(() => {
        fetchData();
    }, [date]);

    const fetchData = async () => {
        try {
            let fetchedBusySchedule = await client.fetch(busyScheduleQuery(dayjs(date).format('YYYY-MM-DD')));
            if (fetchedBusySchedule) setBusySchedule({...fetchedBusySchedule, busyHours: fetchedBusySchedule?.busyHours ?? []})
            else setBusySchedule({
                _type: 'busySchedule',
                date: dayjs(date).format('YYYY-MM-DD'),
                busyHours: [],
            });
            setRideHoursList(await client.fetch(rideHoursListQuery));
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Ошибка загрузки данных'
            })
        }
    }

    const handleChekbox = (hour, isChecked) => {
        let updatedBusyHours = busySchedule?.busyHours;
        console.log('f', busySchedule)
        if (isChecked) {
            updatedBusyHours.push(hour);
        } else {
            updatedBusyHours = updatedBusyHours.filter((item) => item?._id != hour?._id)
        }

        setBusySchedule((prevState) => ({
            ...prevState,
            busyHours: updatedBusyHours
        }))
    }

    const saveChanges = () => {
        
        if (busySchedule._id) {
            client.patch(busySchedule?._id)
                .set({
                    busyHours: busySchedule?.busyHours?.map((busyHour) => { return { _ref: busyHour?._id, _key: uuid.v4() } }),
                })
                .commit()
                .then((updatedDoc) => {
                    console.log(updatedDoc)
                    Toast.show({
                        type: 'success',
                        text1: 'Сохранено'
                    })
                })
                .catch((err) => {
                    Toast.show({
                        type: 'error',
                        text1: 'Ошибка при сохранении'
                    })
                })
        } else client.create({
            _id: uuid.v4(),
            _type: 'rideBusySchedule',
            date: busySchedule?.date,
            busyHours: busySchedule?.busyHours?.map((busyHour) => { return { _ref: busyHour?._id, _key: uuid.v4() } })
        })
            .then((updatedDoc) => {
                console.log(updatedDoc)
                Toast.show({
                    type: 'success',
                    text1: 'Сохранено'
                })
            })
            .catch((err) => {
                console.log(err)
                Toast.show({
                    type: 'error',
                    text1: 'Ошибка при сохранении'
                })
            })


    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text category="s1">
                    Выберите дату
                </Text>
                <Datepicker
                    date={date}
                    onSelect={nextDate => setDate(nextDate)}
                />
            </View>
            <Divider />
            <ScrollView style={styles.hourListContainer}>
                <Text style={styles.hourListTitle}>Занятые часы</Text>
                <Divider />
                {
                    rideHoursList?.map((hour) =>
                        <View style={styles.hourContainer} key={hour?._id}>
                            <View style={styles.hourContent}>
                                <Text category="s1">{ConverDecimalHours(hour?.startTime)} - {ConverDecimalHours(hour?.endTime)}</Text>
                                <CheckBox
                                    checked={busySchedule?.busyHours?.map(val => val?._id).includes(hour?._id)}
                                    onChange={(val) => { handleChekbox(hour, val) }}
                                />
                            </View>
                            <Divider />
                        </View>
                    )
                }
            </ScrollView>
            <View>
                <Divider style={{ width: '100%' }} />
                <View style={styles.footerContainer}>

                    <Button onPress={() => saveChanges()}>
                        Сохранить
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        gap: 8,
        paddingVertical: 25,
        paddingHorizontal: 15,
    },
    hourListContainer: {
        paddingHorizontal: 15
    },
    hourListTitle: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600
    },
    hourContainer: {
    },
    hourContent: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footerContainer: {
        padding: 20,
        backgroundColor: "white"
    }
})

export default rideBusySchedule