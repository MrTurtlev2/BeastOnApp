import {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {Colors} from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Fonts';
import type {IExerciseSet} from '../../../../constants/interfaces';

interface IExerciseSetRow {
    set: IExerciseSet;
    index: number;
    isActive: boolean;
    isCompleted: boolean;
}

const ExerciseSetRow = memo(({set, index, isActive, isCompleted}: IExerciseSetRow) => {
    const status = isCompleted ? 'zaliczona' : isActive ? 'aktualna' : 'oczekująca';

    return (
        <View
            accessible
            accessibilityRole="summary"
            accessibilityLabel={`Seria ${index + 1}, ${set.repetitions} powtórzeń, ${set.weight} kilogramów, ${status}`}
            style={[styles.row, isActive && styles.activeRow]}>
            {isActive && <View style={styles.focusBar} />}

            <View style={[styles.numberCircle, isActive && styles.activeNumberCircle]}>
                <Text style={[styles.number, isActive && styles.activeNumber]}>{index + 1}</Text>
            </View>

            <Text style={styles.repetitions}>{set.repetitions} powt.</Text>
            <Text style={styles.weight}>{set.weight} kg</Text>

            <View style={[styles.statusCircle, isCompleted && styles.completedCircle]}>
                {isCompleted && <Ionicons name="checkmark" size={19} color={Colors.white} />}
            </View>
        </View>
    );
});

ExerciseSetRow.displayName = 'ExerciseSetRow';

const styles = StyleSheet.create({
    row: {
        paddingVertical: 16,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#292929',
        backgroundColor: '#101010',
        overflow: 'hidden',
        marginBottom: 20,
    },
    activeRow: {
        borderColor: '#3A3A3A',
    },
    focusBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 5,
        backgroundColor: Colors.pink,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    numberCircle: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 19,
        borderWidth: 1,
        borderColor: '#292929',
    },
    activeNumberCircle: {
        borderColor: Colors.pink,
    },
    number: {
        color: Colors.lightGrey,
        fontSize: 16,
        fontFamily: Fonts.regular,
    },
    activeNumber: {
        color: Colors.white,
    },
    repetitions: {
        marginLeft: 20,
        color: Colors.white,
        fontSize: 15,
        fontFamily: Fonts.light,
    },
    weight: {
        marginLeft: 'auto',
        marginRight: 44,
        color: Colors.white,
        fontSize: 15,
        fontFamily: Fonts.light,
    },
    statusCircle: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#292929',
    },
    completedCircle: {
        borderColor: '#FF3D69',
        backgroundColor: '#FF3D69',
    },
});

export default ExerciseSetRow;
