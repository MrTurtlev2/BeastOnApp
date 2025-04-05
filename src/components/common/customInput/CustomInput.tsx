import {KeyboardTypeOptions, TextInput, View} from 'react-native';
import {styles} from './Style.ts';
import {colors} from '../../../constants/theme.ts';

interface CustomInput {
    onChangeText: (value: string) => void;
    value: string;
    keyboardType?: KeyboardTypeOptions;
    placeholder?: string;
}

export default function CustomInput({
    onChangeText,
    value,
    keyboardType = 'default',
    placeholder,
}: CustomInput) {
    return (
        <View style={styles.wrapper}>
            <TextInput
                placeholderTextColor={colors.placeholderColor}
                placeholder={placeholder}
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
            />
        </View>
    );
}
