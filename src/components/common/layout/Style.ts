import {ImageStyle, StyleSheet} from 'react-native';
import {colors} from '../../../constants/theme.ts';

const bgImageBase: ImageStyle = {
    opacity: 0.6,
    position: 'absolute',
};

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.bgGrey,
    },
    bgImageLeftTop: {
        ...bgImageBase,
        height: 400,
        width: 400,
        top: 0,
        left: 0,
    },
    bgImageRightCenter: {
        ...bgImageBase,
        right: 0,
        width: 250,
        height: 450,
        top: 80,
    },
    burgerBtn: {
        position: 'absolute',
        zIndex: 1,
        right: 20,
        top: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
