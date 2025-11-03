import {StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {barShadow} from '../../../../constants/GlobalStyles';
import {Fonts} from '../../../../constants/Fonts';

interface ExerciseBar {
    exerciseName: string;
    onPress: () => void;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    index?: number;
}

const NewExerciseBar = ({index, exerciseName, onPress, containerStyle, textStyle}: ExerciseBar) => {
    return (
        <TouchableOpacity onPress={onPress} style={[style.main, containerStyle]}>
            {index && <Text style={style.indexIndicator}>{index}</Text>}
            <Text numberOfLines={2} style={[style.exerciseName, textStyle]}>
                {exerciseName}
            </Text>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    main: {
        borderRadius: 24,
        backgroundColor: Colors.bgGrey,
        paddingVertical: 30,
        paddingHorizontal: 15,
        marginBottom: 30,
        overflow: 'hidden',
        ...barShadow,
    },
    indexIndicator: {
        position: 'absolute',
        right: -2,
        top: -25,
        fontSize: 70,
        zIndex: 1,
        color: Colors.pink,
        fontFamily: Fonts.regular,
    },
    exerciseName: {
        fontSize: 22,
        fontFamily: Fonts.regular,
        color: Colors.white,
        textAlign: 'center',
    },
});

export default NewExerciseBar;
