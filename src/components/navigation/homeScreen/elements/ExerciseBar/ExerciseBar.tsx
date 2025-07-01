import {style} from './Style';
import {Text, TouchableOpacity, View} from 'react-native';

interface ExerciseBar {
    exerciseName: string;
    onPress: () => void;
}

export default function ExerciseBar({exerciseName, onPress}: ExerciseBar) {
    return (
            <TouchableOpacity onPress={onPress} style={style.main}>
                <Text style={style.exerciseName}>{exerciseName}</Text>
            </TouchableOpacity>
    );
}
