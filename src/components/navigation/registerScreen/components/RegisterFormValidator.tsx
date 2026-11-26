import {StyleSheet, Text, View} from 'react-native';
import CustomIcon from '../../../common/customIcon/CustomIcon';
import {IconFontEnum} from '../../../../constants/interfaces';
import {Colors} from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Fonts';

interface IRegisterFormValidator {
    isValid: boolean;
    text: string;
}

const RegisterFormValidator = ({isValid, text}: IRegisterFormValidator) => {
    return (
        <View style={styles.main}>
            <CustomIcon
                name={isValid ? 'check' : 'dot-single'}
                font={IconFontEnum.Entypo}
                size={isValid ? 22 : 20}
                color={isValid ? Colors.pink || '#D04C63' : '#6E6E73'}
            />
            <Text style={[styles.text, isValid && styles.textValid]}>{text || 'fallback text'}</Text>
        </View>
    );
};

export default RegisterFormValidator;

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    text: {
        fontSize: 15,
        color: '#8E8E93',
        marginLeft: 10,
        fontFamily: Fonts.bold,
    },
    textValid: {
        color: '#F5F5F7',
    },
});
