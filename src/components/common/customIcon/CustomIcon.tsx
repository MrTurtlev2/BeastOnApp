import {Feather, FontAwesome, Ionicons, MaterialIcons, Octicons} from '@expo/vector-icons';
import {Colors} from '../../../constants/Colors';
import {IconFontEnum, ICustomIcon} from '../../../constants/interfaces';

const CustomIcon = ({name, font, color, size, style}: ICustomIcon) => {
    const defaultColor = color || Colors.pink;
    const defaultSize = size || 24;

    const pickFont = () => {
        if (font === IconFontEnum.Feather) return <Feather name={name} size={defaultSize} color={defaultColor} style={style} />;
        if (font === IconFontEnum.FontAwesome) return <FontAwesome name={name} size={defaultSize} color={defaultColor} style={style} />;
        if (font === IconFontEnum.Ionicons) return <Ionicons name={name} size={defaultSize} color={defaultColor} style={style} />;
        if (font === IconFontEnum.MaterialIcons) return <MaterialIcons name={name} size={defaultSize} color={defaultColor} style={style} />;
        if (font === IconFontEnum.Octicons) return <Octicons name={name} size={defaultSize} color={defaultColor} style={style} />;
    };

    return pickFont();
};

export default CustomIcon;
