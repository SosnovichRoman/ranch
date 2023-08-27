import { Pressable, TouchableOpacity, View } from "react-native"
import { StyleSheet } from 'react-native';
import { Divider, Text } from "@ui-kitten/components";
import { dividerDarkColor, dividerDefaultColor } from "../../constants/colors";
import { Link } from "expo-router";
import { ConverDecimalHours } from "../../utils/convert";

const ScheduleRecord = ({ showDate, record }) => {

    return (
        <Link href={`/rideActivity/${record._id}`} style={styles.link} asChild>
            <TouchableOpacity style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.timeSection}>
                        {/* {showDate && <Text style={styles.timeDate} category="s1">{record?.date}</Text>} */}
                        <Text style={styles.timeTimeText}>{ConverDecimalHours(record?.startTime)}</Text>
                        <Divider style={styles.timeDivider} />
                        <Text style={styles.timeTimeText}>{ConverDecimalHours(record?.endTime)}</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.rideType}>{record?.rideType.name}</Text>
                        <Text>ФИО: <Text style={styles.boldText}>{record?.clientName}</Text></Text>
                        <Text>Количество персон: <Text style={styles.boldText}>{record?.personCount}</Text></Text>
                    </View>
                </View>
                <Divider style={styles.bottomDivider} />
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    link: {
        width: '100%',
    },
    wrapper: {
        width: '100%',
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 15,
    },
    timeSection: {
        flexBasis: '20%',
        flexShrink: 0,
        paddingHorizontal: 15,
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
        paddingHorizontal: 15,
        gap: 10,
    },
    rideType: {
        fontSize: 18,
        fontWeight: 600,
    },
    boldText : {
        fontWeight: 600
    },
    bottomDivider: {
        width: '100%',
        alignSelf: 'stretch',
        height: 1,
        backgroundColor: dividerDefaultColor
    }
});

export default ScheduleRecord