import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';
import {simpleShadow} from '../../../constants/GlobalStyles';

export const style = StyleSheet.create({
    main: {
        backgroundColor: Colors.pink,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnShadow: {
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
