import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const style = StyleSheet.create({
    main: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: Colors.pink,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnShadow: {
        width: 80,
        height: 80,
        borderRadius: 80,
        shadowOpacity: 0.8,
        shadowRadius: 6,
        shadowOffset: {
            width: 2,
            height: 3,
        },
        backgroundColor: '#333',
    },
});
