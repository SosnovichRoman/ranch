import { View } from "react-native"
import { StyleSheet } from 'react-native';
import { Divider, Text } from "@ui-kitten/components";
import { dividerDarkColor, dividerDefaultColor } from "../../constants/colors";
import { Link } from "expo-router";
import { ConverDecimalHours } from "../../utils/convert";

const ScheduleRecord = ({ showDate, record }) => {

    return (
        <Link href={`/rideActivity/${record._id}`} style={{display: 'flex', flexDirection: 'column'}}>

                <View style={styles.container}>

                    <View style={styles.timeSection}>
                        {/* {showDate && <Text style={styles.timeDate} category="s1">{record?.date}</Text>} */}
                        <Text style={styles.timeTimeText}>{ConverDecimalHours(record?.startTime)}</Text>
                        <Divider style={styles.timeDivider} />
                        <Text style={styles.timeTimeText}>{ConverDecimalHours(record?.endTime)}</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.rideType}>{record?.rideType.name}</Text>
                        <Text>ФИО: <Text category="s1">{record?.clientName}</Text></Text>
                        <Text>Количество персон: <Text category="s1">{record?.personCount}</Text></Text>
                    </View>
                </View>
                <Divider style={styles.bottomDivider} />


        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row'
    },
    timeSection: {
        flexBasis: '20%',
        flexShrink: 0,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
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
        borderLeftColor: dividerDefaultColor,
        borderStyle: 'solid',
        flex: 1,
        height: '100%',
        padding: 15,
        gap: 10,
    },
    rideType: {
        fontSize: 18,
        fontWeight: 600
    },
    bottomDivider: {
        width: '100%',
        alignSelf: 'stretch',
        height: 2,
        backgroundColor: dividerDarkColor
    }
});

export default ScheduleRecord