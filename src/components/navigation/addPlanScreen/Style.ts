import {StyleSheet} from 'react-native';
import {Fonts} from '../../../constants/Fonts';
import {Colors} from '../../../constants/Colors';

export const style = StyleSheet.create({
    seriesSeparator: {
        color: Colors.lightGrey,
        fontFamily: Fonts.Marker,
        fontSize: 40,
        paddingHorizontal: 1,
        marginHorizontal: -6,
        position: 'relative',
        zIndex: 1,
        marginBottom: 5,
    },
});
