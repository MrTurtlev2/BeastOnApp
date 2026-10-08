import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../constants/Colors';

export const style = StyleSheet.create({
    main: {
        paddingHorizontal: 10,
        paddingBottom: 50,
    },
    container: {
        position: 'relative',
        overflow: 'hidden',
    },
    page: {
        width: '100%',
    },
    visible: {
        zIndex: 1,
    },
    hidden: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    confirmMsg: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: Colors.white,
        paddingVertical: 10,
        textAlign: 'center',
    },
});
