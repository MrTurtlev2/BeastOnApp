import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';

export const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${Colors.white}`,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    btnText: {
        fontSize: 16,
        fontFamily: Fonts.Marker,
    },
});
