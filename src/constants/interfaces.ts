import {KeyboardTypeOptions, StyleProp, TextStyle} from 'react-native';

export enum IconFontEnum {
    Feather = 'Feather',
    FontAwesome = 'FontAwesome',
    Ionicons = 'Ionicons',
    MaterialIcons = 'MaterialIcons',
    Octicons = 'Octicons',
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
    iconName?: ICustomIcon['name'];
    iconSize?: ICustomIcon['size'];
    iconFont?: IconFontEnum;
    iconColor?: ICustomIcon['color'];
}
