import { useEffect, useState } from "react"
import { View, Text, Button, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native"
import { Link } from "expo-router"
import client from "../components/SanityClient/client"
import { rideTypesQuery } from "../utils/data"
import LoginStyles from "../styles/LoginStyles"

const LoginScreen = () => {

    useEffect(() => {
        client.fetch(rideTypesQuery).then((data) => console.log(data)).catch((err) => console.log('err', err))
    }, [])

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = () =>{
        if(login == '' || password == '') alert('Заполните все поля')
        else{
            console.log({
                login,
                password
            })
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={{paddingHorizontal: 15}}>
                    <View>
                        <View>
                            <Text style={LoginStyles.label}>Логин</Text>
                            <TextInput value={login} onChangeText={(text) => setLogin(text)} style={LoginStyles.input} placeholder="Введите логин" />
                        </View>
                        <View>
                            <Text style={LoginStyles.label}>Пароль</Text>
                            <TextInput value={password} onChangeText={(text) => setPassword(text)} style={LoginStyles.input} placeholder="Введите пароль" />
                        </View>
                        <TouchableOpacity style={LoginStyles.button} onPress={submitHandler}>
                            <Text>Войти</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen