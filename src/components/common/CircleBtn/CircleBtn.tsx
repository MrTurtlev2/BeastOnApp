import {StyleProp, TouchableOpacity} from 'react-native';
import {style} from './Style.ts';

interface CircleBtn {
    customStyle?: StyleProp<any>;
    icon: any;
    onPress: () => void;
}

export default function CircleBtn({icon, customStyle, onPress}: CircleBtn) {
    return (
        <TouchableOpacity onPress={onPress} style={[style.main, customStyle]}>
            {icon}
        </TouchableOpacity>
    );
}
