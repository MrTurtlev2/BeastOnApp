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
        console.log('test');
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
                <LinearGradient colors={['#282828', '#202020']} style={styles.btnGradient}>
                    <Text style={styles.btnText}>ON</Text>
                </LinearGradient>
            </Pressable>
        </View>
    );
};

export default LottiePowerButton;
