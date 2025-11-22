import {TextInput, View} from 'react-native';
import {Styles} from './Style';
import {Colors} from '../../../constants/Colors';
import CustomIcon from '../customIcon/CustomIcon';
import {ICustomInput} from '../../../constants/interfaces';

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
    secureTextEntry,
    autoComplete = 'off',
    textContentType,
    importantForAutofill = 'no',
    size = 'default',
}: ICustomInput) => {
    const styles = Styles(size);

    return (
        <View style={[styles.wrapper, containerStyle]}>
            <CustomIcon name={iconName} font={iconFont} size={iconSize || 50} color={iconColor || '#D04C63'} style={styles.icon} />
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
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

export default CustomInput;
