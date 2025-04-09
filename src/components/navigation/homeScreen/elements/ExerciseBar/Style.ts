import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../../../constants/theme.ts';

export const style = StyleSheet.create({
    main: {
        marginHorizontal: 25,
        borderRadius: 24,
        marginBottom: 30,
        backgroundColor: colors.bgGrey,
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    exerciseName: {
        fontSize: 20,
        fontFamily: fonts.regular,
        color: colors.white,
    },
});
