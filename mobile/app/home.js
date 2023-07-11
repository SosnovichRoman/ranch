import { Link } from "expo-router"
import { View, Text, Button, SafeAreaView, ScrollView } from "react-native"

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