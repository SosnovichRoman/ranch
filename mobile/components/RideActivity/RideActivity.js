import { useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native"
import { StyleSheet } from 'react-native';
import { Divider, Input, Select, SelectItem, Text, IndexPath, Datepicker, Toggle, Button } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import client from "../../components/SanityClient/client";
import { instructorsQuery, rideActivityQuery, rideDurationsListQuery, rideTypesQuery } from "../../utils/data";
import dayjs from "dayjs";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import uuid from 'react-native-uuid';

const RideActivity = () => {
    const params = useLocalSearchParams();
    const [fetchingError, setFetchingError] = useState(false)
    const [rideActivity, setRideActivity] = useState();
    const [rideTypesList, setRideTypesList] = useState([]);
    const [instructorsList, setInstructorsList] = useState([]);
    const [rideDurationsList, setRideDurationsList] = useState([]);

    const [fio, setFio] = useState('');
    const [phone, setPhone] = useState('');
    const [count, setCount] = useState('');
    const [selectedIndexRideType, setSelectedIndexRideType] = useState(new IndexPath(0));
    const [selectedIndexRideDuration, setSelectedIndexRideDuration] = useState(new IndexPath(0));
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [approved, setApproved] = useState(false);
    const [selectedIndexInstructor, setSelectedIndexInstructor] = useState([new IndexPath(0)]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            setRideTypesList(await client.fetch(rideTypesQuery));
            setRideDurationsList(await client.fetch(rideDurationsListQuery));
            setInstructorsList(await client.fetch(instructorsQuery));
            const fetchedRideActivity = await client.fetch(rideActivityQuery(params.id));
            if (!fetchedRideActivity) setFetchingError(true);
            else setRideActivity(fetchedRideActivity);

        } catch (error) {
            setFetchingError(true);
        }
    }

    //call when rideActivity fetched
    useEffect(() => {
        if (rideActivity != {} && rideActivity) {
            setFields(rideActivity);
        }
    }, [rideActivity])

    const setFields = (data) => {
        setFio(data?.clientName);
        setPhone(data?.clientPhone);
        setSelectedIndexRideType(new IndexPath(
            rideTypesList.findIndex((rideType) => rideType._id == data?.rideType?._id)
        ));
        setCount(data?.personCount.toString());
        setDate(new Date(data?.date))
        setSelectedIndexRideType(new IndexPath(
            rideDurationsList.findIndex((rideDuration) => rideDuration._id == data?.duration?._id)
        ));
        setStartTime(data?.startTime.toString());
        setEndTime(data?.endTime.toString());
        setApproved(data?.approved);
        setSelectedIndexInstructor(
            instructorsList?.map((instructor, index) => {
                if (data?.instructors?.map(item => item?._id)?.includes(instructor?._id))
                    return new IndexPath(index)
            }).filter(item => item != undefined)
        );
    }

    const saveChanges = () => {

        // console.log(instructorsList.filter((val, index) => selectedIndexInstructor.map((selectedIndex) => selectedIndex.row).includes(index)))
        const instructors = instructorsList
        .filter((val, index) => selectedIndexInstructor.map((selectedIndex) => selectedIndex.row).includes(index))
        .map((val) => {
            return {
                _ref: val?._id,
                _key: uuid.v4()
            }
        })

        client
            .patch(rideActivity?._id) // Document ID to patch
            .set({
                clientName: fio,
                clientPhone: phone,
                personCount: Number(count),
                rideType: {
                    _ref: rideTypesList[selectedIndexRideType.row]?._id
                },
                date: dayjs(date).format('YYYY-MM-DD'),
                startTime: Number(startTime),
                endTime: Number(endTime),
                duration: {
                    _ref: rideDurationsList[selectedIndexRideDuration.row]?._id
                },
                approved: approved,
                instructors: instructors,

            }) // Shallow merge
            .commit() // Perform the patch and return a promise
            .then((updatedDoc) => {
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
    }

    if (fetchingError) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Не удалось загрузить информацию</Text>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: 'white', flex: 1 }}>
                <View>
                    <Text>
                        ФИО
                    </Text>
                    <Input style={styles.input} value={fio} onChangeText={val => setFio(val)} />
                </View>
                <View>
                    <Text>
                        Контактный номер
                    </Text>
                    <Input style={styles.input} value={phone} onChangeText={val => setPhone(val)} />
                </View>
                <View>
                    <Text>
                        Тип поездки
                    </Text>
                    <Select style={styles.input}
                        selectedIndex={selectedIndexRideType}
                        onSelect={(index) => setSelectedIndexRideType(index)}
                        value={rideTypesList?.[selectedIndexRideType.row]?.name}
                    >
                        {
                            rideTypesList?.map(rideType => <SelectItem title={rideType?.name} key={rideType?._id} />)
                        }
                    </Select>
                </View>
                <View>
                    <Text>
                        Количество человек
                    </Text>
                    <Input style={styles.input} value={count} onChangeText={val => setCount(val)} />
                </View>
                <View>
                    <Text>
                        Дата
                    </Text>
                    <Datepicker style={styles.input}
                        date={date}
                        onSelect={nextDate => setDate(nextDate)}
                    />
                </View>
                <View>
                    <Text>
                        Начало
                    </Text>
                    <Input style={styles.input} onChangeText={val => setStartTime(val)} value={startTime} />
                </View>
                <View>
                    <Text>
                        Окончание
                    </Text>
                    <Input style={styles.input} onChangeText={val => setEndTime(val)} value={endTime} />
                </View>
                <View>
                    <Text>
                        Длительность
                    </Text>
                    <Select style={styles.input}
                        selectedIndex={selectedIndexRideDuration}
                        onSelect={(index) => setSelectedIndexRideDuration(index)}
                        value={rideDurationsList?.[selectedIndexRideDuration.row]?.name}
                    >
                        {
                            rideDurationsList?.map(rideDuration => <SelectItem title={rideDuration?.name} key={rideDuration?._id} />)
                        }
                    </Select>
                </View>
                {/* <View>
                <Text>
                    Описание
                </Text>
                <Input style={styles.input} value="3" />
            </View> */}
                <View style={{ flexDirection: 'row', gap: 30, alignItems: "center" }}>
                    <Text>
                        Подтверждено
                    </Text>
                    <Toggle
                        checked={approved}
                        onChange={(val) => setApproved(val)}
                    >
                    </Toggle>
                </View>
                <View>
                    <Text>
                        Инструктор
                    </Text>
                    <Select style={styles.input}
                        multiSelect={true}
                        selectedIndex={selectedIndexInstructor}
                        onSelect={(index) => setSelectedIndexInstructor(index)}
                        value={'Назначенные инструкторы'}
                    >
                        {
                            instructorsList?.map(instructor => <SelectItem title={instructor?.name} key={instructor?._id} />)
                        }
                    </Select>
                </View>
                {/* There is bug with padding bottom */}
                {/* <View style={{ height: 10 }}></View> */}

            </ScrollView>
            <View>
                <Divider style={{ width: '100%' }} />
                <View style={styles.footerContainer}>

                    <Button onPress={() => saveChanges()}>
                        Сохранить
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    listItem: {

    },
    input: {
        marginTop: 8
    },
    footerContainer: {
        padding: 20,
        backgroundColor: "white"
    }
});

export default RideActivity