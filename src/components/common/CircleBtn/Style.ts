import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';
import {simpleShadow} from '../../../constants/GlobalStyles';

export const style = StyleSheet.create({
    main: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: Colors.pink,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnShadow: {
        width: 100,
        height: 100,
        borderRadius: 100,
        shadowOpacity: 0.8,
        shadowRadius: 6,
        shadowOffset: {
            width: 2,
            height: 3,
        },
        backgroundColor: '#333',
        ...simpleShadow,
    },
    text: {
        fontSize: 40,
        fontFamily: Fonts.Marker,
        color: Colors.white,
    },
});
