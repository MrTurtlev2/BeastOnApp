import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {style} from './Style';
import {Colors} from '../../../constants/Colors';
import {ICircleBtn} from '../../../constants/interfaces';

export default function CircleBtn({icon, customStyle, onPress, text, isLoading = false, textColor, bgColor}: ICircleBtn) {
    return (
        <View style={style.btnShadow}>
            <TouchableOpacity onPress={onPress} style={[style.main, customStyle, bgColor && {backgroundColor: bgColor}]}>
                {icon}
                {text && !isLoading && <Text style={[style.text, textColor && {color: textColor}]}>{text}</Text>}
                {isLoading && <ActivityIndicator size={'large'} color={Colors.white} />}
            </TouchableOpacity>
        </View>
    );
}
