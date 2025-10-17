import {Animated, Pressable, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {styles} from './Style';
import {useRef} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {Colors} from '../../../constants/Colors';

interface ILottiePowerButton {
    onPress: () => void;
    style?: any;
}

const LottiePowerButton = ({onPress, style}: ILottiePowerButton) => {
    const animation = useRef<LottieView>(null);
    const borderColorAnim = useRef(new Animated.Value(0)).current;

    const onButtonPress = () => {
        animation.current.play();
        Animated.timing(borderColorAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
        }).start();
        onPress();
    };

    const animatedBackgroundColor = borderColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#3D3D3D', Colors.pink],
    });

    return (
        <View style={[styles.wrapper, style]}>
            <LottieView
                ref={animation}
                style={styles.lottieView}
                loop={false}
                source={require('../../../assets/lottie/power-effect.json')}
            />
            <Pressable onPress={onButtonPress} style={styles.btn}>
                <Animated.View style={[styles.btnBorder, {backgroundColor: animatedBackgroundColor}]}>
                    <LinearGradient colors={['#282828', '#202020']} style={styles.btnGradientOuter}>
                        <LinearGradient colors={['#202020', '#282828']} style={styles.btnGradient}>
                            <Text style={styles.btnText}>ON</Text>
                        </LinearGradient>
                    </LinearGradient>
                </Animated.View>
            </Pressable>
        </View>
    );
};

export default LottiePowerButton;
