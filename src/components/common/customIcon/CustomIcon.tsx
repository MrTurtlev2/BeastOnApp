import {Feather, FontAwesome, Ionicons} from '@expo/vector-icons';
import {Colors} from '../../../constants/Colors';
import {IconFontEnum, ICustomIcon} from '../../../constants/interfaces';

const CustomIcon = ({name, font, color, size, style}: ICustomIcon) => {
    const pickFont = () => {
        if (font === IconFontEnum.Feather) return <Feather name={name} size={size || 24} color={color || Colors.pink} style={style} />;
        if (font === IconFontEnum.FontAwesome)
            return <FontAwesome name={name} size={size || 24} color={color || Colors.pink} style={style} />;
        if (font === IconFontEnum.Ionicons) return <Ionicons name={name} size={size || 24} color={color || Colors.pink} style={style} />;
    };

    return pickFont();
};

export default CustomIcon;
