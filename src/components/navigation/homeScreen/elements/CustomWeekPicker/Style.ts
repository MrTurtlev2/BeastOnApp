import {StyleSheet} from 'react-native';
import {colors} from '../../../../../constants/colors.ts';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        margin: 10,
    },
    dayContainer: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#333',
        minWidth: 50,
        alignItems: 'center',
    },
    selectedDay: {
        borderWidth: 2,
        borderColor: 'red',
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: `${colors.lightGrey}`,
    },
    dayText: {
        fontSize: 14,
        color: `${colors.lightGrey}`,
    },
});
