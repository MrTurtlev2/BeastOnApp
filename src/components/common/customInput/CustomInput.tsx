import {Pressable, TextInput, View} from 'react-native';
import {Styles} from './Style';
import {Colors} from '../../../constants/Colors';
import CustomIcon from '../customIcon/CustomIcon';
import {IconFontEnum, ICustomInput} from '../../../constants/interfaces';
import {useState} from 'react';

const CustomInput = ({
    onChangeText,
    value,
    keyboardType = 'default',
    placeholder,
    iconName = 'person',
    iconFont,
    iconSize,
    iconColor,
    containerStyle,
    secureTextEntry = false,
    autoComplete = 'off',
    textContentType,
    importantForAutofill = 'no',
    size = 'default',
}: ICustomInput) => {
    const styles = Styles(size);
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);

    const changePasswordVisibility = (): void => {
        setIsSecureTextEntry(prev => !prev);
    };

    return (
        <View style={[styles.wrapper, containerStyle]}>
            <CustomIcon name={iconName} font={iconFont} size={iconSize || 40} color={iconColor || '#D04C63'} style={styles.icon} />
            <TextInput
                placeholderTextColor={Colors.placeholderColor}
                placeholder={placeholder}
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                importantForAutofill={importantForAutofill}
                textContentType={textContentType}
                autoComplete={autoComplete}
                secureTextEntry={isSecureTextEntry}
            />
            {secureTextEntry && (
                <Pressable onPress={changePasswordVisibility} style={{zIndex: 2}}>
                    <CustomIcon name={isSecureTextEntry ? 'eye' : 'eye-with-line'} font={IconFontEnum.Entypo} size={40} color={'#D04C63'} />
                </Pressable>
            )}
        </View>
    );
};

export default CustomInput;
