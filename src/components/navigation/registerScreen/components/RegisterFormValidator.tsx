import {StyleSheet, Text, View} from 'react-native';
import CustomIcon from '../../../common/customIcon/CustomIcon';
import {IconFontEnum} from '../../../../constants/interfaces';
import {Colors} from '../../../../constants/Colors';

interface IRegisterFormValidator {
    isValid: boolean;
    text: string;
}

const RegisterFormValidator = ({isValid, text}: IRegisterFormValidator) => {
    return (
        <View style={styles.main}>
            <CustomIcon
                name={isValid ? 'check' : 'cross'}
                font={IconFontEnum.Entypo}
                size={30}
                color={isValid ? Colors.pink : Colors.lightGrey}
            />
            <Text style={styles.text}>{text || 'fallback text'}</Text>
        </View>
    );
};
export default RegisterFormValidator;

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
    },
});
