import {TextInput, View} from 'react-native';
import {styles} from './Style';
import {Colors} from '../../../constants/Colors';
import CustomIcon from '../customIcon/CustomIcon';
import {IconFontEnum, ICustomInput} from '../../../constants/interfaces';

export default function CustomInput({onChangeText, value, keyboardType = 'default', placeholder, iconName = 'person'}: ICustomInput) {
    return (
        // @ts-ignore
        <View style={styles.wrapper}>
            <CustomIcon name={iconName} font={IconFontEnum.Ionicons} size={24} color="#D04C63" style={styles.icon} />
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
}
