import {style} from './Style';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

interface ExerciseBar {
    exerciseName: string;
    onPress: () => void;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export default function ExerciseBar({exerciseName, onPress, containerStyle, textStyle}: ExerciseBar) {
    return (
        <TouchableOpacity onPress={onPress} style={[style.main, containerStyle]}>
            <Text style={[style.exerciseName, textStyle]}>{exerciseName}</Text>
        </TouchableOpacity>
    );
}
