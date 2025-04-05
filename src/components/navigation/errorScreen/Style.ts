import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants/theme';

export const style = StyleSheet.create({
    errorText: {
        marginBottom: 50,
        marginTop: 20,
        fontFamily: `${fonts.Marker}`,
        color: `${colors.lightRed}`,
        fontSize: 45,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10,
    },
    infoText: {
        color: colors.white,
        fontFamily: fonts.regular,
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 40,
    },
    bgImage: {
        width: 400,
        height: 400,
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
});
