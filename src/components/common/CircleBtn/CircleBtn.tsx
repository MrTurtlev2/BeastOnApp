import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {style} from './Style';
import {Colors} from '../../../constants/Colors';
import {ICircleBtn} from '../../../constants/interfaces';

export default function CircleBtn({icon, customStyle, onPress, text, isLoading = false, textColor, bgColor, size = 100}: ICircleBtn) {
    return (
        <View style={[style.btnShadow, {width: size, height: size, borderRadius: size / 2}]}>
            <TouchableOpacity
                onPress={onPress}
                style={[
                    style.main,
                    customStyle,
                    {width: size, height: size, borderRadius: size / 2},
                    bgColor && {backgroundColor: bgColor},
                ]}>
                {icon}
                {text && !isLoading && <Text style={[style.text, textColor && {color: textColor}]}>{text}</Text>}
                {isLoading && <ActivityIndicator size={'large'} color={Colors.white} />}
            </TouchableOpacity>
        </View>
    );
}
