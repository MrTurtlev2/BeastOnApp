import {useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../../common/customInput/CustomInput';
import {IExercise, IExerciseSet} from '../../../../constants/interfaces';
import {style} from '../Style';
import CircleBtn from '../../../common/CircleBtn/CircleBtn';
import {Colors} from '../../../../constants/Colors';
import {Toast} from 'toastify-react-native';

type Props = {
    existingExercise: IExercise | null;
    onSave: (exercise: IExercise) => void;
    onCancel: () => void;
};

const ExerciseEditorPage = ({existingExercise, onSave, onCancel}: Props) => {
    const {t} = useTranslation();

    const [exerciseName, setExerciseName] = useState(existingExercise?.name ?? '');
    const [sets, setSets] = useState<IExerciseSet[]>(existingExercise?.sets ?? []);

    const flatListRef = useRef<FlatList>(null);

    const addSet = () => {
        setSets(prev => {
            const updated = [...prev, {weight: '', repetitions: ''}];

            setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                    index: updated?.length - 1,
                    animated: true,
                });
            }, 100);

            return updated;
        });
    };

    const updateSet = (index: number, field: keyof IExerciseSet, value: string) => {
        setSets(prev => {
            const updated = [...prev];
            updated[index][field] = Number(value);
            return updated;
        });
    };

    const handleSave = () => {
        const isSetsValid = sets.every(set => typeof set?.repetitions === 'number' && typeof set?.weight === 'number');
        const isExerciseNameValid = exerciseName && exerciseName.trim() !== '';
        if (!isSetsValid || !isExerciseNameValid) {
            Toast.show({
                type: 'error',
                text1: !isSetsValid ? t('emptySeries') : t('emptyExerciseName'),
                // useModal: false,
            });
            return;
        }
        onSave({name: exerciseName, sets});
    };

    const renderSet = ({item, index}: {item: IExerciseSet; index: number}) => (
        <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
            <CustomInput
                value={String(item.weight)}
                onChangeText={text => updateSet(index, 'weight', text)}
                placeholder={t('weight')}
                containerStyle={{flex: 1}}
                keyboardType="numeric"
                size={'small'}
            />
            <Text style={style.seriesSeparator}>X</Text>
            <CustomInput
                value={String(item.repetitions)}
                onChangeText={text => updateSet(index, 'repetitions', text)}
                placeholder={t('repetitions')}
                containerStyle={{flex: 1}}
                keyboardType="numeric"
                size={'small'}
            />
        </View>
    );

    const ListFooterComponent = () => (
        <View style={{alignItems: 'center'}}>
            <CircleBtn onPress={addSet} text={'+'} />
        </View>
    );

    return (
        <View style={{flex: 1}}>
            <FlatList
                ref={flatListRef}
                data={sets}
                keyExtractor={(_, index) => index?.toString()}
                renderItem={renderSet}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
                ListHeaderComponent={
                    <CustomInput
                        value={exerciseName}
                        onChangeText={setExerciseName}
                        placeholder={t('exerciseName')}
                        containerStyle={{marginBottom: 10}}
                    />
                }
                ListFooterComponent={ListFooterComponent}
            />
            <View
                style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 30,
                }}>
                <CircleBtn onPress={onCancel} text={'X'} textColor={Colors.pink} bgColor={Colors.lightGrey} />
                <CircleBtn onPress={handleSave} text={'OK'} />
            </View>
        </View>
    );
};

export default ExerciseEditorPage;
