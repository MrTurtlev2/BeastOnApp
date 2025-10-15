import {TextInput, View} from 'react-native';
import {styles} from './Style';
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
}: ICustomInput) => {
    return (
        <View style={styles.wrapper}>
            <CustomIcon name={iconName} font={iconFont} size={iconSize || 50} color={iconColor || '#D04C63'} style={styles.icon} />
            <TextInput
                placeholderTextColor={Colors.placeholderColor}
                placeholder={placeholder}
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
            />
        </View>
    );
};

export default CustomInput;
