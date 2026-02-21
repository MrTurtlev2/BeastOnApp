import {Text, View} from 'react-native';
import {styles} from './Style';

const Separator = ({text}: {text: string}) => {
    return (
        <View style={styles.separatorWrapper}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>{text}</Text>
            <View style={styles.separatorLine} />
        </View>
    );
};
export default Separator;
