import {StyleProp, Text, TouchableOpacity, View} from 'react-native';
import {style} from './Style';

// import {ShadowedView} from 'react-native-fast-shadow';

interface CircleBtn {
    customStyle?: StyleProp<any>;
    icon?: any;
    text?: string;
    onPress: () => void;
}

export default function CircleBtn({icon, customStyle, onPress, text}: CircleBtn) {
    return (
        <View style={style.btnShadow}>
            <TouchableOpacity onPress={onPress} style={[style.main, customStyle]}>
                {icon}
                {text && <Text style={style.text}>{text}</Text>}
            </TouchableOpacity>
        </View>
    );
}
