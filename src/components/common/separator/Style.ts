import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';

export const styles = StyleSheet.create({
    separatorWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    separatorLine: {
        height: 2,
        width: '30%',
        backgroundColor: Colors.placeholderColor,
    },
    separatorText: {
        fontFamily: `${Fonts.regular}`,
        color: Colors.placeholderColor,
        marginHorizontal: 20,
        fontSize: 20,
        marginBottom: 5,
    },
});
