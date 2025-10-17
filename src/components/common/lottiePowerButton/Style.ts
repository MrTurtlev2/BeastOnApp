import {StyleSheet, ViewStyle} from 'react-native';
import {Fonts} from '../../../constants/Fonts';
import {Colors} from '../../../constants/Colors';

const centerContent: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
};

const shadowStyle: ViewStyle = {
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.35,
};

const boxShadow: ViewStyle = {
    boxShadow: `${'rgba(0, 0, 0, 0.20)'} 0px 7px 8px` as any,
};

export const styles = StyleSheet.create({
    wrapper: {
        ...centerContent,
        marginBottom: 10,
        position: 'relative',
        height: 100,
        width: 100,
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
        ...centerContent,
        position: 'absolute',
        zIndex: 2,
    },
    btnBorder: {
        ...centerContent,
        ...boxShadow,
        backgroundColor: '#3D3D3D',
        height: 138,
        width: 138,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: '#2B2B2B',
    },
    btnGradientOuter: {
        ...centerContent,
        ...shadowStyle,
        ...boxShadow,
        width: 108,
        height: 108,
        borderRadius: 60,
        elevation: 4,
    },
    btnGradient: {
        ...centerContent,
        ...shadowStyle,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    btnText: {
        fontSize: 46,
        fontFamily: Fonts.Marker,
        color: Colors.white,
    },
});
