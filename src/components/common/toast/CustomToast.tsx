import {Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {customToastStyles, TOAST_CONFIG} from './Style';
import {Colors} from '../../../constants/Colors';

interface ICustomToast {
    text1: string;
    type: keyof typeof TOAST_CONFIG;
}

const CustomToast = ({type = 'info', text1}: ICustomToast) => {
    const config = TOAST_CONFIG[type] || TOAST_CONFIG.info;
    const {icon, title, mainColor, secondaryColor} = config;

    const colors = [mainColor, mainColor, secondaryColor, secondaryColor];
    const locations = [0, 0.01, 0.3, 1];

    const gradientStart = {x: 0, y: 0.5};
    const gradientEnd = {x: 3, y: 0.5};

    return (
        <LinearGradient colors={colors} locations={locations} start={gradientStart} end={gradientEnd} style={customToastStyles.container}>
            <View style={customToastStyles.contentWrapper}>
                <View style={[customToastStyles.iconCircle, {backgroundColor: mainColor}]}>
                    <FontAwesome6 name={icon} size={30} color={Colors.white} />
                </View>
                <View style={customToastStyles.textContainer}>
                    <Text style={customToastStyles.title}>{title || 'Brak wiadomości.'}</Text>
                    <Text style={customToastStyles.message}>{text1?.replace(/;/g, '\n') || 'Brak wiadomości. Sprawdź konfigurację.'}</Text>
                </View>
            </View>
        </LinearGradient>
    );
};

export default CustomToast;
