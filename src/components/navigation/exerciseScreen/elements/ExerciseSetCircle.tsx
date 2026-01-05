import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Fonts';
import {barShadow} from '../../../../constants/GlobalStyles';

const ExerciseSetCircle = ({set, index, isActive, isCompleted}) => {
    return (
        <View style={[styles.setCircle, (isActive || isCompleted) && styles.activeCircle]}>
            <Text style={[styles.setNumber, (isActive || isCompleted) && {color: Colors.pink}]}>{index + 1}</Text>
            <View style={styles.centerContent}>
                <Text style={[styles.valueText, {alignSelf: 'flex-start'}]}>{set.repetitions}</Text>
                <Text style={styles.seriesSeparator}>X</Text>
                <Text style={[styles.valueText, {alignSelf: 'flex-end'}]}>{set.weight}kg</Text>
            </View>
        </View>
    );
};
export default ExerciseSetCircle;

const styles = StyleSheet.create({
    setCircle: {
        width: 123,
        height: 123,
        borderRadius: 100,
        backgroundColor: Colors.bgGrey,
        justifyContent: 'center',
        overflow: 'hidden',
        ...barShadow,
    },
    activeCircle: {
        borderColor: '#E94560',
        elevation: 10,
        shadowOpacity: 0.3,
    },
    setNumber: {
        position: 'absolute',
        top: -7,
        right: 5,
        fontSize: 64,
        color: Colors.placeholderColor,
        zIndex: 1,
        fontFamily: Fonts.regular,
    },

    centerContent: {
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 22,
    },
    valueText: {
        color: Colors.white,
        fontSize: 24,
        fontFamily: Fonts.regular,
        lineHeight: 27,
    },
    seriesSeparator: {
        color: Colors.lightGrey,
        fontFamily: Fonts.Marker,
        fontSize: 30,
        marginVertical: -8,
        marginLeft: -15,
    },
});
