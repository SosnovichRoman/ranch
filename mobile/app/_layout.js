import { Stack } from 'expo-router'
import React from 'react'
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer'
import { Button } from 'react-native';
import { ApplicationProvider } from "@ui-kitten/components/theme";
import * as eva from '@eva-design/eva';


const Layout = () => {

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <Drawer
                drawerContent={(props) => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <Button title="Расписание" onPress={() => props.navigation.navigate("schedule")} />
                            <Button title="Login" onPress={() => props.navigation.navigate("login")} />
                            <Button title="Logout" onPress={() => console.log('CUSTOM LOGOUT')} />
                        </DrawerContentScrollView>)
                }}
            >
                <Drawer.Screen name='schedule' options={{ title: "Расписание" }} />
                <Drawer.Screen name='login' options={{ title: "Вход" }} />
            </Drawer>
        </ApplicationProvider>
    )
}

export default Layout