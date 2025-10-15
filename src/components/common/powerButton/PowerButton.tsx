import {Text, TouchableOpacity} from 'react-native';
import {styles} from './Style';

interface IPowerButton {
    onPress: () => void;
    style?: any;
}

export default function PowerButton({onPress, style}: IPowerButton) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
            <Text style={styles.btnText}>ON</Text>
        </TouchableOpacity>
    );
}
