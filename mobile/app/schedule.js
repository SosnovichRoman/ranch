import { Link } from "expo-router"
import { View, Text, Button, SafeAreaView, ScrollView } from "react-native"
import { ScreenStackHeaderConfig } from "react-native-screens"

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Home page</Text>
                <Link href="/login">About</Link>
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomeScreen