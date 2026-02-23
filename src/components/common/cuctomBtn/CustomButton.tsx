import {Pressable, Text, View, ViewStyle} from 'react-native';
import {styles} from './Style';

interface ICustomButton {
    onPress: () => void;
    text: string;
    type: 'primary' | 'secondary';
    style?: ViewStyle;
}

const CustomButton = ({onPress, text, type, style}: ICustomButton) => {
    const buttonStylePicker = () => {
        if (type === 'primary') return styles.primaryMain;
        if (type === 'secondary') return styles.secondaryMain;
        return {};
    };
    const textStylePicker = () => {
        if (type === 'primary') return styles.primaryText;
        if (type === 'secondary') return styles.secondaryText;
        return {};
    };

    return (
        <Pressable onPress={onPress} style={[buttonStylePicker(), style]}>
            <Text style={textStylePicker()}>{text}</Text>
            {type === 'secondary' && <View style={styles.secondaryUnderline} />}
        </Pressable>
    );
};

export default CustomButton;
