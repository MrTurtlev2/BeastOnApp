import {StyleSheet} from 'react-native';
import {colors} from '../../../constants.ts';

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.bgGrey,
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
