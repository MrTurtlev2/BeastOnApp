import {Text, View} from 'react-native';
import {Colors} from '../../../constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {Fonts} from '../../../constants/Fonts';

const ErrorToast = ({text1}) => {
    return (
        <View
            pointerEvents="none"
            style={{
                padding: 16,
                width: '100%',
                backgroundColor: Colors.pink,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <FontAwesome6 name="circle-exclamation" size={24} color={Colors.white} />
            <Text style={{color: Colors.white, fontFamily: Fonts.bold}}>{text1}</Text>
            {/*{props.text2 && <Text style={{color: 'white'}}>{props.text2}</Text>}*/}
        </View>
    );
};
export default ErrorToast;
