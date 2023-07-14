import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native"
import { StyleSheet } from 'react-native';
import { Divider, Input, Select, SelectItem, Text, IndexPath, Datepicker, Toggle } from "@ui-kitten/components";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import client from "../../components/SanityClient/client";
import { rideActivityQuery, rideDurationsListQuery, rideTypesQuery } from "../../utils/data";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const rideActivity = ({ }) => {
    const params = useLocalSearchParams();
    const [fetchingError, setFetchingError] = useState(false)
    const [rideActivity, setRideActivity] = useState();
    const [rideTypesList, setRideTypesList] = useState();
    const [rideDurationsList, setRideDurationsList] = useState();

    const [fio, setFio] = useState('');
    const [phone, setPhone] = useState('');
    const [count, setCount] = useState('');
    const [selectedIndexRideType, setSelectedIndexRideType] = useState(new IndexPath(0));
    const [selectedIndexRideDuration, setSelectedIndexRideDuration] = useState(new IndexPath(0));


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            setRideTypesList(await client.fetch(rideTypesQuery));
            setRideDurationsList(await client.fetch(rideDurationsListQuery));
            const fetchedRideActivity = await client.fetch(rideActivityQuery(params.id));
            if(!fetchedRideActivity) setFetchingError(true);
            else {
                setRideActivity(fetchedRideActivity);
                setFields(fetchedRideActivity);
            } 
        } catch (error) {
            setFetchingError(true);
        }

    }

    const setFields = (data) => {
        setFio(data?.clientName);
        setPhone(data?.clientPhone);
        setCount(data?.clietCount);
    }

    if (fetchingError) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Не удалось загрузить информацию</Text>
        </View>
    )

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: 'white' }}>
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
                <Input style={styles.input} value="3" />
            </View>
            <View>
                <Text>
                    Дата
                </Text>
                <Datepicker style={styles.input}
                // date={date}
                // onSelect={nextDate => setDate(nextDate)}
                />
            </View>
            <View>
                <Text>
                    Начало
                </Text>
                <Input style={styles.input} value="3" />
            </View>
            <View>
                <Text>
                    Окончание
                </Text>
                <Input style={styles.input} value="3" />
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
            <View>
                <Text>
                    Описание
                </Text>
                <Input style={styles.input} value="3" />
            </View>
            <View style={{ flexDirection: 'row', gap: 30, alignItems: "center" }}>
                <Text>
                    Подтверждено
                </Text>
                <Toggle
                // checked={checked}
                // onChange={onCheckedChange}
                >

                </Toggle>
            </View>
            {/* 
            <View style={{marginBottom: 30}}>
                <Text>
                    Инструктор
                </Text>
                <Select style={styles.input}>
                    <SelectItem title='Соснович Роман' />
                </Select>
            </View> */}
            {/* There is bug with padding bottom */}
            <View style={{ height: 10 }}></View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    listItem: {

    },
    input: {
        marginTop: 8
    },
    // label: {
    //     marginBottom: 8
    // }

});

export default rideActivity