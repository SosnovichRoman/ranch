import { Redirect } from "expo-router";
import 'react-native-url-polyfill/auto';

const Home = () => {
    return (
        <Redirect href="/login" />
    )
}

export default Home