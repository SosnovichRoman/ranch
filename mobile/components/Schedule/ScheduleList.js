import { View, ScrollView} from "react-native"
import { StyleSheet } from 'react-native';
import { Divider, Text } from "@ui-kitten/components";
import ScheduleRecord from "./ScheduleRecord";

const ScheduleList = ({ date, schedule }) => {

    const records = schedule?.filter((item) => item.date == date.format('YYYY-MM-DD'))

    if (!records || records?.length == 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text>Пусто</Text>
            </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1 }} key={date.format()}>
            {
                records.map((item) => (
                    <ScheduleRecord record={item} showDate={false} key={item?._id} />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ScheduleList