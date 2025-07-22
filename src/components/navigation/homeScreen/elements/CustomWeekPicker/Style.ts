import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../constants/Colors';
import {Fonts} from '../../../../../constants/Fonts';

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
        borderRadius: 30,
        minWidth: 50,
        alignItems: 'center',
        backgroundColor: '#333',
        borderWidth: 4,
        borderColor: 'transparent',
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: {
            width: 5,
            height: 3,
        },
    },
    selectedDay: {
        borderWidth: 4,
        borderColor: `${Colors.lightRed}`,
    },
    dateText: {
        fontSize: 18,
        fontFamily: `${Fonts.bold}`,
        color: `${Colors.lightGrey}`,
    },
    dayText: {
        fontSize: 14,
        color: `${Colors.lightGrey}`,
    },
});
