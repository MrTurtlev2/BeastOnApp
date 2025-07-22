import {Text, TouchableOpacity} from 'react-native';
import {styles} from './Style';

interface PowerButton {
    onPress: () => void;
    style?: any;
}

export default function PowerButton({onPress, style}: PowerButton) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
            <Text style={styles.btnText}>ON</Text>
        </TouchableOpacity>
    );
}
