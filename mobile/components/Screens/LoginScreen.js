import { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import client from "../../components/SanityClient/client"
import { loginQuery } from "../../utils/data"
import { Button, Input, Text } from "@ui-kitten/components"
import { Toast } from "react-native-toast-message/lib/src/Toast"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Redirect, useRouter } from "expo-router"
import { readUser } from "../../utils/userStorage"

const LoginScreen = () => {

    const router = useRouter();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState()

    const submitHandler = () => {
        if (login == '' || password == '') {
            Toast.show({
                type: 'error',
                text1: 'Заполните все поля',
            })
        } else {
            client.fetch(loginQuery(login, password))
                .then((data) => {
                    if (data) {
                        storeData(data);
                    }
                    else Toast.show({
                        type: 'error',
                        text1: 'Не удалось войти',
                    })
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                    Toast.show({
                        type: 'error',
                        text1: 'Не удалось войти',
                    })
                })
        }
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('user', jsonValue);
            Toast.show({
                type: 'success',
                text1: 'Успешный вход',
            })
            router.push(`userSchedule/${user._id}`)
        } catch (e) {
            console.log(e)
            Toast.show({
                type: 'error',
                text1: 'Ошибка',
                text2: 'Не удалось сохранить данные пользователя. Обратитесь к разработчику.'
            })
        }
    };

    useEffect(() => {
        readUserData();
    }, [])

    const readUserData = async () => {
        const user = await readUser();
        setUser(user);
    }

    if (user) return (<Redirect href={{ pathname: 'userSchedule', params: { id: user?._id } }} />)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Вход</Text>
                    <View style={styles.inputBox}>
                        <Text category="s1">Логин</Text>
                        <Input
                            placeholder='Введите логин'
                            value={login}
                            onChangeText={newLogin => setLogin(newLogin)}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text category="s1">Пароль</Text>
                        <Input
                            placeholder='Введите пароль'
                            value={password}
                            onChangeText={newPassword => setPassword(newPassword)}
                        />
                    </View>
                    <Button style={{ marginTop: 10 }} onPress={submitHandler}>
                        Войти
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
    },
    form: {
        flex: 1,
        width: '100%',
        gap: 25,
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 25
    },
    inputBox: {
        width: '100%',
        gap: 10,
        // paddingHorizontal: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 600
    }
})

export default LoginScreen