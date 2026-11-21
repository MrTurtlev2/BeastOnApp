import {Pressable, Text, ViewStyle} from 'react-native';
import {styles} from './Style';

interface ICustomButton {
    onPress: () => void;
    text: string;
    type: 'primary' | 'secondary';
    style?: ViewStyle;
}

const CustomButton = ({onPress, text, type, style}: ICustomButton) => {
    const buttonStyle = {
        primary: styles.primaryMain,
        secondary: styles.secondaryMain,
    };
    const textStyle = {
        primary: styles.primaryText,
        secondary: styles.secondaryText,
    };
  
    return (
        <Pressable onPress={onPress} style={[buttonStyle[type], style]}>
            <Text style={textStyle[type]}>{text}</Text>
        </Pressable>
    );
};

export default CustomButton;
