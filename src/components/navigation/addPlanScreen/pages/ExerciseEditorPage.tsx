import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../../common/customInput/CustomInput';
import {IExercise, IExerciseSet} from '../../../../constants/interfaces';

type Props = {
    existingExercise: IExercise | null;
    onSave: (exercise: IExercise) => void;
    onCancel: () => void;
};

const ExerciseEditorPage = ({existingExercise, onSave, onCancel}: Props) => {
    const {t} = useTranslation();

    const [exerciseName, setExerciseName] = useState(existingExercise?.name ?? '');
    const [sets, setSets] = useState<IExerciseSet[]>(existingExercise?.sets ?? []);

    const addSet = () => setSets(prev => [...prev, {weight: 0, repetitions: 0}]);

    const updateSet = (index: number, field: keyof IExerciseSet, value: string) => {
        setSets(prev => {
            const updated = [...prev];
            updated[index][field] = Number(value);
            return updated;
        });
    };

    const handleSave = () => {
        if (!exerciseName.trim()) return;
        onSave({name: exerciseName, sets});
    };

    return (
        <ScrollView style={{flex: 1, paddingHorizontal: 20}} showsVerticalScrollIndicator={false}>
            <CustomInput
                value={exerciseName}
                onChangeText={setExerciseName}
                placeholder={t('exerciseName')}
                containerStyle={{marginBottom: 20}}
            />

            {sets?.map((set, index) => (
                <View key={index} style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
                    <CustomInput
                        value={String(set.weight)}
                        onChangeText={text => updateSet(index, 'weight', text)}
                        placeholder={t('weight')}
                        containerStyle={{flex: 1}}
                        keyboardType="numeric"
                    />
                    <CustomInput
                        value={String(set.repetitions)}
                        onChangeText={text => updateSet(index, 'repetitions', text)}
                        placeholder={t('repetitions')}
                        containerStyle={{flex: 1}}
                        keyboardType="numeric"
                    />
                </View>
            ))}

            <TouchableOpacity onPress={addSet} style={{marginTop: 10}}>
                <Text style={{color: '#00aaff', fontWeight: 'bold'}}>+ {t('addSet') ?? 'Dodaj serię'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} style={{marginTop: 30}}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>{t('saveExercise') ?? 'Zapisz ćwiczenie'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCancel} style={{marginTop: 10}}>
                <Text style={{color: 'red'}}>{t('cancel') ?? 'Anuluj'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ExerciseEditorPage;
