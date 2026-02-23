import {Text, View, ViewStyle} from 'react-native';
import {styles} from './Style';

const Separator = ({text, style}: {text: string; style?: ViewStyle}) => {
    return (
        <View style={[styles.separatorWrapper, style]}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>{text}</Text>
            <View style={styles.separatorLine} />
        </View>
    );
};
export default Separator;
