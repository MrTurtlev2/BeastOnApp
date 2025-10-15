import {Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {styles} from './Style';
import {useRef} from 'react';
import {Fonts} from '../../../constants/Fonts';

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
            <TouchableOpacity onPress={onButtonPress} style={styles.btn}>
                <Text style={[styles.btnText, {fontFamily: Fonts.Marker}]}>ON</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LottiePowerButton;
