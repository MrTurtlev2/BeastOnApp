import {StyleSheet} from 'react-native';
import {Fonts} from '../../../../../constants/Fonts';
import {Colors} from '../../../../../constants/Colors';

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
    },
});
