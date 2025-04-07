import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants/theme';

export const style = StyleSheet.create({
    welcomeText: {
        fontSize: 32,
        fontFamily: `${fonts.bold}`,
        color: colors.white,
        marginBottom: 25,
    },
    welcomeUserName: {
        fontSize: 32,
        fontFamily: `${fonts.bold}`,
        color: colors.pink,
    },
    secondWelcomeText: {
        fontSize: 24,
        fontFamily: `${fonts.regular}`,
        color: colors.white,
        textAlign: 'center',
        marginBottom: 25,
    },
});
