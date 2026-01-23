import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import ClawMarksSvg from '../../../assets/images/svg/common/ClawMarksSvg';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';

interface IClawTitle {
    text: string;
    style?: StyleProp<ViewStyle>;
    type?: 'regular' | 'heading';
}

const ClawTitle = ({text, style, type = 'regular'}: IClawTitle) => {
    const isHeading = type === 'heading';
    const clawSize = isHeading ? 120 : 62;
    const clawPosition = isHeading
        ? {
              top: -40,
              left: -75,
          }
        : {
              top: -30,
              left: -35,
          };

    return (
        <View style={[styles.main, {marginRight: isHeading ? -30 : 0}, style]}>
            <View>
                <Text
                    style={[
                        styles.title,
                        {
                            fontSize: isHeading ? 48 : 23,
                            fontFamily: isHeading ? Fonts.Marker : Fonts.regular,
                        },
                    ]}>
                    {text}
                </Text>
                <View style={[styles.clawIcon, clawPosition]}>
                    <ClawMarksSvg size={clawSize} rotateType={type} />
                </View>
            </View>
        </View>
    );
};
export default ClawTitle;

const styles = StyleSheet.create({
    main: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 23,
        color: Colors.white,
        zIndex: 2,
    },
    clawIcon: {
        position: 'absolute',
        zIndex: 1,
    },
});
