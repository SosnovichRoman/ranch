import { View } from "react-native"
import { StyleSheet } from 'react-native';
import { Divider, Text } from "@ui-kitten/components";
import { dividerColor } from "../../constants/colors";

const ScheduleRecord = () => {
  return (
    <View style={styles.container}>
        
        <View style={styles.timeSection}>
            <Text style={styles.timeDate} category="s1">10-05-2023</Text>
            <Text style={styles.timeTimeText}>10:00</Text>
            <Divider style={styles.timeDivider} />
            <Text style={styles.timeTimeText}>11:00</Text>
        </View>
        <View style={styles.infoSection}>
            <Text style={styles.rideType}>Тренировка</Text>
            <Text>ФИО: <Text category="s1">Соснович Роман Олегович</Text></Text>
            <Text>Количество персон: <Text category="s1">3</Text></Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row'
    },
    timeSection: {
        padding: 15,
        alignItems: 'center',
    },
    timeDate: {
        marginBottom: 10
    },
    timeDivider: {
        width: '60%',
    },
    timeTimeText: {
        paddingVertical: 4,
    },
    infoSection: {
        borderLeftWidth: 1,
        borderLeftColor: dividerColor,
        borderStyle: 'solid',
        flex: 1,
        height: '100%',
        padding: 15,
        gap: 10,
    },
    rideType: {
        fontSize: 18,
        fontWeight: 600
    }
});

export default ScheduleRecord