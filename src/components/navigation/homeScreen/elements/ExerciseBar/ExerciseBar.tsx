import {style} from './Style.ts';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

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
