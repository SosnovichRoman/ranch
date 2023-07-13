import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native"
import { StyleSheet } from 'react-native';
import { Divider, Input, Select, SelectItem, Text, IndexPath, Datepicker, Toggle } from "@ui-kitten/components";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import client from "../../components/SanityClient/client";
import { rideActivityQuery } from "../../utils/data";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const rideActivity = ({}) => {
    const params  = useLocalSearchParams();
    const [rideActivity, setRideActivity] = useState()

    const [fio, setFio] = useState('');
    const [phone, setPhone] = useState('');
    const [count, setCount] = useState('');
    // const [selectedIndexRideType, setSelectedIndexRideType] = useState(new IndexPath(0));
    // const [selectedIndexDuration, setSelectedIndexDuration] = useState(new IndexPath(0));


    useEffect(() => {
        client.fetch(rideActivityQuery(params.id))
        .then((data) => {
            console.log(data)
            if(data?.length == 0 || !data){
                return(
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Не удалось загрузить информацию</Text>
                    </View>
                )
            }
            else {
                setRideActivity(data);
                setFields(data);
            }
        })
        .catch((err) => {
            console.log(err)
            Toast.show({
                type: 'error',
                text1: 'Ошибка загрузки'
            })
            return(
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Не удалось загрузить информацию</Text>
                </View>
            )
        })
    }, [])

    const setFields = (data) => {
        setFio(data?.clientName);
        setPhone(data?.clientPhone);
        setCount(data?.clietCount);
    }
    

    return (
        <ScrollView contentContainerStyle={styles.container} style={{backgroundColor: 'white'}}>
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
                <Select style={styles.input}>
                    <SelectItem title='Тренировка' />
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
                <Select style={styles.input}>
                    <SelectItem title='3 часа' />
                </Select>
            </View>
            <View>
                <Text>
                    Описание
                </Text>
                <Input style={styles.input} value="3" />
            </View>
            <View style={{flexDirection: 'row', gap: 30, alignItems: "center"}}>
                <Text>
                    Подтверждено
                </Text>
                <Toggle
                    // checked={checked}
                    // onChange={onCheckedChange}
                >

                </Toggle>
            </View>
            <View>
                <Text>
                    Описание
                </Text>
                <Input style={styles.input} value="3" />
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
            <View style={{height: 10}}></View>

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