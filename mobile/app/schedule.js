import { useState } from "react";
import { Link } from "expo-router"
import { View, Button, SafeAreaView, ScrollView } from "react-native"
import { ScreenStackHeaderConfig } from "react-native-screens"
import { StyleSheet } from 'react-native';
import { Layout, Text, ViewPager, TabBar, Tab, Divider } from '@ui-kitten/components';
import { primaryGreen } from "../constants/colors";
import ScheduleRecord from "../components/Schedule/ScheduleRecord";


const HomeScreen = () => {

    const tabs = [
        {
            id: '1',
            tabName: 'first',
            tabContent: 'first tab'
        },
        {
            id: '2',
            tabName: 'second',
            tabContent: 'second tab'
        },
        {
            id: '3',
            tabName: 'third',
            tabContent: 'third tab'
        },
        {
            id: '4',
            tabName: 'fourth',
            tabContent: 'fourth tab'
        },
        {
            id: '5',
            tabName: 'fifth',
            tabContent: 'fifth tab'
        },
        {
            id: '6',
            tabName: 'sixth',
            tabContent: 'sixth tab'
        },
        {
            id: '7',
            tabName: 'seventh',
            tabContent: 'seventh tab'
        },
        {
            id: '1',
            tabName: 'first',
            tabContent: 'first tab'
        },
        {
            id: '2',
            tabName: 'second',
            tabContent: 'second tab'
        },
        {
            id: '3',
            tabName: 'third',
            tabContent: 'third tab'
        },
        {
            id: '4',
            tabName: 'fourth',
            tabContent: 'fourth tab'
        },
        {
            id: '5',
            tabName: 'fifth',
            tabContent: 'fifth tab'
        },
        {
            id: '6',
            tabName: 'sixth',
            tabContent: 'sixth tab'
        },
        {
            id: '7',
            tabName: 'seventh',
            tabContent: 'seventh tab'
        }
    ]
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ViewPager
                style={{ flex: 1 }}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
            >
                {tabs.map((tab) =>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.tabHeader}>
                            <Text style={styles.tabTitle}>{tab.tabName}</Text>
                            <Divider style={styles.headerDivider} />
                        </View>
                        <ScheduleRecord />
                        <Divider />
                    </ScrollView>
                )}
            </ViewPager>
        </SafeAreaView>



    )

}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabHeader: {
        width: '100%',
        alignItems: "center",
    },
    tabTitle: {
        fontSize: 16,
        fontWeight: 500,
        paddingVertical: 12,
    },
    headerDivider: {
        width: '100%',
    }
});


export default HomeScreen