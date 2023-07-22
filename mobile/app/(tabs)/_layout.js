import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer'
import { Button, Divider, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { clearUser } from '../../utils/userStorage';

const Layout = () => {

    const accountExit = (props) => {
        clearUser();
        props.navigation.navigate("login")
    }

    return (
        <Drawer
            drawerContent={(props) => {
                return (
                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                        <DrawerContentScrollView {...props}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("schedule")} style={styles.drawerItem}>
                                <Text category='s1'>Расписание</Text>
                            </TouchableOpacity>
                            <Divider />
                            <TouchableOpacity onPress={() => props.navigation.navigate("rideBusySchedule")} style={styles.drawerItem}>
                                <Text category='s1'>График работы</Text>
                            </TouchableOpacity>
                            <Divider />
                            <TouchableOpacity onPress={() => props.navigation.navigate("login")} style={styles.drawerItem}>
                                <Text category='s1'>Логин</Text>
                            </TouchableOpacity>
                            <Divider />
                        </DrawerContentScrollView>
                        <Button onPress={() => accountExit(props)}>
                            Выйти
                        </Button>
                    </View>)
            }}
        >
            <Drawer.Screen name='schedule' options={{ title: "Расписание" }} />
            <Drawer.Screen name='rideBusySchedule' options={{ title: "График работы" }} />
        </Drawer>
    )
}

const styles = StyleSheet.create({
    drawerItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        cursor: 'pointer'
    }
})

export default Layout