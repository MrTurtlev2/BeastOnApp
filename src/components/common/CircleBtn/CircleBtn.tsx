import {StyleProp, TouchableOpacity, View} from 'react-native';
import {style} from './Style';
// import {ShadowedView} from 'react-native-fast-shadow';

interface CircleBtn {
    customStyle?: StyleProp<any>;
    icon: any;
    onPress: () => void;
}

export default function CircleBtn({icon, customStyle, onPress}: CircleBtn) {
    return (
        <View style={style.btnShadow}>
            <TouchableOpacity onPress={onPress} style={[style.main, customStyle]}>
                {icon}
            </TouchableOpacity>
        </View>
    );
}
