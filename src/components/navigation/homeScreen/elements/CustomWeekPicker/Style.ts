import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../../../constants/theme.ts';

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
        borderColor: `${colors.lightRed}`,
    },
    dateText: {
        fontSize: 18,
        fontFamily: `${fonts.bold}`,
        color: `${colors.lightGrey}`,
    },
    dayText: {
        fontSize: 14,
        color: `${colors.lightGrey}`,
    },
});
