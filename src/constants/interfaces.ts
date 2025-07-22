import {KeyboardTypeOptions, StyleProp, TextStyle} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export enum IconFontEnum {
    Feather = 'Feather',
    FontAwesome = 'FontAwesome',
    Ionicons = 'Ionicons',
}

export interface ICustomIcon {
    name: string;
    font: IconFontEnum;
    color?: string;
    size?: number;
    style?: StyleProp<TextStyle>;
}

export interface ICustomInput {
    onChangeText: (value: string) => void;
    value: string;
    keyboardType?: KeyboardTypeOptions;
    placeholder?: string;
    iconName?: keyof typeof Ionicons.glyphMap;
}
