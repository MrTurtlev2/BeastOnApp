import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const style = StyleSheet.create({
    main: {
        width: '100%',
        position: 'absolute',
        top: 50,
        backgroundColor: Colors.white,
        minHeight: 100,
        paddingHorizontal: 15,
    },
    queueItem: {
        marginBottom: 10,
    },
});
