import React, { useState, useEffect } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer'
import { Button, Divider, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { clearUser, readUser } from '../../utils/userStorage';
import { Link } from 'expo-router';
import client from "../../components/SanityClient/client";
import { userListQuery } from '../../utils/data';

const Layout = () => {

    const [user, setUser] = useState();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        readUser().then((data) => {
            setUser(data)
        });
        client.fetch(userListQuery).then((data) => setUserList(data))
    }, [])

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
                            {
                                user?.role?.name == 'admin' &&
                                <>
                                    <TouchableOpacity style={styles.drawerItem}>
                                        <Text category='s1'><Link href={`/unapprovedActivities`}>Неподтвержденные заявки</Link></Text>
                                    </TouchableOpacity>
                                    <Divider />
                                    <TouchableOpacity style={styles.drawerItem}>
                                        <Text category='s1'><Link href={`lastActivities`}>Последние заявки</Link></Text>
                                    </TouchableOpacity>
                                    <Divider />
                                    {/* <TouchableOpacity style={styles.drawerItem}>
                                        <Text category='s1'><Link href={`???`}>График работы</Link></Text>
                                    </TouchableOpacity>
                                    <Divider /> */}
                                    {/* <TouchableOpacity style={styles.drawerItem}>
                                        <Text category='s1'><Link href={`userSchedule/0`}>Полное расписание</Link></Text>
                                    </TouchableOpacity> */}
                                    <Divider />
                                    {
                                        userList.map((user) =>
                                            <View key={user?._id}>
                                                <TouchableOpacity style={styles.drawerItem}>
                                                    <Text category='s1'><Link href={`userSchedule/${user?._id}`}>Расписание {user?.name}</Link></Text>
                                                </TouchableOpacity>
                                                <Divider />
                                            </View>)
                                    }
                                </>
                            }

                            <TouchableOpacity style={styles.drawerItem}>
                                <Text category='s1'><Link href={`userSchedule/${user?._id}`}>Моё расписание</Link></Text>
                            </TouchableOpacity>
                            <Divider />

                        </DrawerContentScrollView>
                        <Button onPress={() => accountExit(props)}>
                            Выйти
                        </Button>
                    </View>)
            }}
        >
            <Drawer.Screen name='userSchedule' options={{ title: "Расписание" }} />
            <Drawer.Screen name='rideBusySchedule' options={{ title: "График работы" }} />
            <Drawer.Screen name='unapprovedActivities' options={{ title: "Неподтвержденные заявки" }} />
            <Drawer.Screen name='lastActivities' options={{ title: "Последние заявки" }} />
            {/* <Drawer.Screen name={`userSchedule`} options={{ title: "" }} /> */}
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