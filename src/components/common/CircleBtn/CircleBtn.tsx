import {StyleProp, TouchableOpacity} from 'react-native';
import {style} from './Style.ts';
import {ShadowedView} from 'react-native-fast-shadow';

interface CircleBtn {
    customStyle?: StyleProp<any>;
    icon: any;
    onPress: () => void;
}

export default function CircleBtn({icon, customStyle, onPress}: CircleBtn) {
    return (
        <ShadowedView style={style.btnShadow}>
            <TouchableOpacity onPress={onPress} style={[style.main, customStyle]}>
                {icon}
            </TouchableOpacity>
        </ShadowedView>
    );
}
