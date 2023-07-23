import { View, ScrollView} from "react-native"
import { StyleSheet } from 'react-native';
import { Divider, Text } from "@ui-kitten/components";
import ScheduleRecord from "./ScheduleRecord";

const ScheduleList = ({ date, schedule }) => {

    let records = [];
    if(date) records = schedule?.filter((item) => item.date == date.format('YYYY-MM-DD'));
    else records = schedule;

    

    if (!records || records?.length == 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text>Пусто</Text>
            </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1 }}>
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