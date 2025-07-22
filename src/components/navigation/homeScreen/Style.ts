import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';

export const style = StyleSheet.create({
    welcomeText: {
        fontSize: 32,
        fontFamily: `${Fonts.bold}`,
        color: Colors.white,
        marginBottom: 25,
    },
    welcomeUserName: {
        fontSize: 32,
        fontFamily: `${Fonts.bold}`,
        color: Colors.pink,
    },
    secondWelcomeText: {
        fontSize: 24,
        fontFamily: `${Fonts.regular}`,
        color: Colors.white,
        textAlign: 'center',
        marginBottom: 25,
    },
});
