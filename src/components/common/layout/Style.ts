import {Dimensions, ImageStyle, StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

const bgImageBase: ImageStyle = {
    opacity: 0.6,
    position: 'absolute',
};

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.bgGrey,
        alignItems: 'center',
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
    bgImageTopCenter: {
        ...bgImageBase,
        left: 0,
        width: Dimensions.get('window').width,
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
