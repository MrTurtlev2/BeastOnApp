import {StyleSheet} from 'react-native';
import {Fonts} from '../../../constants/Fonts';
import {Colors} from '../../../constants/Colors';

export const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: 100,
        height: 100,
    },
    lottieView: {
        width: 400,
        height: 400,
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 1,
        left: -150,
        top: -150,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        position: 'absolute',
        zIndex: 2,
        overflow: 'hidden',
    },
    btnGradient: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 7,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.35,
        boxShadow: `${'rgba(0, 0, 0, 0.35)'} 0px 4px 5px` as any,
    },
    btnText: {
        fontSize: 46,
        fontFamily: `${Fonts.Marker}`,
        color: Colors.white,
    },
});
