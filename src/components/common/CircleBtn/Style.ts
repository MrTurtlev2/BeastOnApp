import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/theme.ts';

export const style = StyleSheet.create({
    main: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: colors.pink,
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
