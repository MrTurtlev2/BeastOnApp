import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../constants/Colors';
import {Fonts} from '../../../../../constants/Fonts';

export const style = StyleSheet.create({
    main: {
        borderRadius: 24,
        backgroundColor: Colors.bgGrey,
        paddingVertical: 30,
        paddingHorizontal: 15,
        marginBottom: 30,
        marginHorizontal: 25,
        // boxShadow: ' -3px -3px 6px rgba(255, 255, 255, 0.1), 3px 3px 6px rgba(0, 0, 0, 0.5)',
        boxShadow: [
            {
                offsetX: -3,
                offsetY: -3,
                blurRadius: 4,
                color: 'rgba(255, 255, 255, 0.05)',
            },
            {
                offsetX: 3,
                offsetY: 3,
                blurRadius: 6,
                color: 'rgba(0, 0, 0, 0.5)',
            },
        ],
    },
    exerciseName: {
        fontSize: 20,
        fontFamily: Fonts.regular,
        color: Colors.white,
    },
    btnShadow: {},
});
