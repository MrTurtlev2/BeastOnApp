import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../constants/Colors';
import {Fonts} from '../../../../../constants/Fonts';
import {barShadow} from '../../../../../constants/GlobalStyles';

export const style = StyleSheet.create({
    main: {
        borderRadius: 24,
        backgroundColor: Colors.bgGrey,
        paddingVertical: 30,
        paddingHorizontal: 15,
        marginBottom: 30,
        ...barShadow,
    },
    exerciseName: {
        fontSize: 20,
        fontFamily: Fonts.regular,
        color: Colors.white,
    },
    btnShadow: {},
});
