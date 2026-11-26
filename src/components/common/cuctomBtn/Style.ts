import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';
import {simpleShadow} from '../../../constants/GlobalStyles';

const text: TextStyle = {
    fontSize: 18,
    fontFamily: Fonts.bold,
};
const button: ViewStyle = {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    width: '100%',
};

export const styles = StyleSheet.create({
    primaryMain: {
        ...button,
        backgroundColor: Colors.pink,
        shadowOpacity: 0.8,
        shadowRadius: 6,
        shadowOffset: {
            width: 2,
            height: 3,
        },
        ...simpleShadow,
    },
    secondaryMain: {
        ...button,
        borderWidth: 1,
        borderColor: Colors.pink,
    },
    primaryText: {
        ...text,
        color: Colors.white,
    },
    secondaryText: {
        ...text,
        color: Colors.pink,
    },
});
