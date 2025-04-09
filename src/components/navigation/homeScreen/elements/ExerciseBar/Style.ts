import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../../../constants/theme.ts';

export const style = StyleSheet.create({
    main: {
        borderRadius: 24,
        backgroundColor: colors.bgGrey,
        paddingVertical: 30,
        paddingHorizontal: 15,

        // marginHorizontal: 25,
        // paddingHorizontal: 15,
        // paddingVertical: 30,
    },
    exerciseName: {
        fontSize: 20,
        fontFamily: fonts.regular,
        color: colors.white,
    },
    btnShadow: {
        marginBottom: 30,
        marginHorizontal: 25,
        borderRadius: 24,
        shadowOpacity: 0.8,
        shadowRadius: 6,
        shadowOffset: {
            width: 2,
            height: 3,
        },
        backgroundColor: '#333',
    },
});
