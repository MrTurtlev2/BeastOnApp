import {Pressable, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {styles} from './Style';
import {useRef} from 'react';
import {LinearGradient} from 'expo-linear-gradient';

interface ILottiePowerButton {
    onPress: () => void;
    style?: any;
}

const LottiePowerButton = ({onPress, style}: ILottiePowerButton) => {
    const animation = useRef<LottieView>(null);

    const onButtonPress = () => {
        animation.current.play();
        onPress();
    };

    return (
        <View style={[styles.wrapper, style]}>
            <LottieView
                ref={animation}
                style={styles.lottieView}
                loop={false}
                source={require('../../../assets/lottie/power-effect.json')}
            />
            <Pressable onPress={onButtonPress} style={styles.btn}>
                <View style={styles.btnBorder}>
                    <LinearGradient colors={['#282828', '#202020']} style={styles.btnGradientOuter}>
                        <LinearGradient colors={['#202020', '#282828']} style={styles.btnGradient}>
                            <Text style={styles.btnText}>ON</Text>
                        </LinearGradient>
                    </LinearGradient>
                </View>
            </Pressable>
        </View>
    );
};

export default LottiePowerButton;
