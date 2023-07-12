import { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import client from "../components/SanityClient/client"
import { rideTypesQuery } from "../utils/data"
import { Button, Input, Text } from "@ui-kitten/components"

const LoginScreen = () => {

    useEffect(() => {
        client.fetch(rideTypesQuery).then((data) => console.log(data)).catch((err) => console.log('err', err))
    }, [])

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = () => {
        if (login == '' || password == '') alert('Заполните все поля')
        else {
            console.log({
                login,
                password
            })
        }
    }

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
                    <Button style={{marginTop: 10}}>
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
        paddingHorizontal: 15,
    },
    form: {
        flex: 1,
        width: '100%',
        gap: 20,
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 20
    },
    inputBox: {
        gap: 8
    },
    title: {
        fontSize: 24,
        fontWeight: 600
    }
})

export default LoginScreen