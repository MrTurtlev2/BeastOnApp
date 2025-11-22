import {ActivityIndicator, StyleProp, Text, TouchableOpacity, View} from 'react-native';
import {style} from './Style';
import {Colors} from '../../../constants/Colors';

interface CircleBtn {
    customStyle?: StyleProp<any>;
    icon?: any;
    text?: string;
    onPress: () => void;
    isLoading?: boolean;
}

export default function CircleBtn({icon, customStyle, onPress, text, isLoading = false}: CircleBtn) {
    return (
        <View style={style.btnShadow}>
            <TouchableOpacity onPress={onPress} style={[style.main, customStyle]}>
                {icon}
                {text && !isLoading && <Text style={style.text}>{text}</Text>}
                {isLoading && <ActivityIndicator size={'large'} color={Colors.white} />}
            </TouchableOpacity>
        </View>
    );
}
