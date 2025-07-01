import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../../../constants/theme';

export const style = StyleSheet.create({
    main: {
        borderRadius: 24,
        backgroundColor: colors.bgGrey,
        paddingVertical: 30,
        paddingHorizontal: 15,
        marginBottom: 30,
        marginHorizontal: 25,
        boxShadow: ' -3px -3px 6px rgba(255, 255, 255, 0.1), 3px 3px 6px rgba(0, 0, 0, 0.5)',
    },
    exerciseName: {
        fontSize: 20,
        fontFamily: fonts.regular,
        color: colors.white,
    },
    btnShadow: {

    },
});
