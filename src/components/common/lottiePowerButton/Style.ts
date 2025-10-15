import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    lottieView: {
        width: 400,
        height: 400,
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 1,
        left: -200,
        top: -200,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${Colors.white}`,
        width: 100,
        height: 100,
        borderRadius: 50,
        position: 'absolute',
        zIndex: 2,
    },
    btnText: {
        fontSize: 16,
        // fontFamily: `${Fonts.regular}`,
        // fontFamily: 'PermanentMarker',
    },
});
