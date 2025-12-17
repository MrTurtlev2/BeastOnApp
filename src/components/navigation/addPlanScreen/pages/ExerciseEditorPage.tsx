import {useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../../common/customInput/CustomInput';
import {IExercise} from '../../../../constants/interfaces';
import {style} from '../Style';
import CircleBtn from '../../../common/CircleBtn/CircleBtn';
import {Colors} from '../../../../constants/Colors';
import {Toast} from 'toastify-react-native';
import Octicons from '@expo/vector-icons/Octicons';
import {nanoid} from 'nanoid/non-secure';
import Animated, {LinearTransition, SlideInRight, SlideOutRight} from 'react-native-reanimated';

type Props = {
    existingExercise: IExercise | null;
    onSave: (exercise: IExercise) => void;
    onCancel: () => void;
};
type ExerciseSetUI = {
    uiId: string;
    weight: string;
    repetitions: string;
};

const ExerciseEditorPage = ({existingExercise, onSave, onCancel}: Props) => {
    const {t} = useTranslation();
    const flatListRef = useRef<FlatList>(null);
    const [exerciseName, setExerciseName] = useState(existingExercise?.name ?? '');
    const [sets, setSets] = useState<ExerciseSetUI[]>(
        existingExercise?.sets
            ? existingExercise.sets.map(set => ({
                  uiId: nanoid(),
                  weight: String(set.weight),
                  repetitions: String(set.repetitions),
              }))
            : [],
    );
    const addSet = () => {
        setSets(prev => {
            const updated = [
                ...prev,
                {
                    uiId: nanoid(),
                    weight: '',
                    repetitions: '',
                },
            ];
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                    index: updated.length - 1,
                    animated: true,
                });
            }, 100);
            return updated;
        });
    };

    const removeSet = (uiId: string) => {
        setSets(prev => prev?.filter(set => set?.uiId !== uiId));
    };

    const updateSet = (uiId: string, field: 'weight' | 'repetitions', value: string) => {
        setSets(prev => prev?.map(set => (set?.uiId === uiId ? {...set, [field]: value} : set)));
    };

    const handleSave = () => {
        const isExerciseNameValid = exerciseName.trim() !== '';
        const isSetsValid = sets.every(set => set.weight !== '' && set.repetitions !== '');
        if (!isSetsValid || !isExerciseNameValid) {
            Toast.show({
                type: 'error',
                text1: !isSetsValid ? t('emptySeries') : t('emptyExerciseName'),
                useModal: false,
            });
            return;
        }
        onSave({
            name: exerciseName,
            sets: sets?.map(set => ({
                weight: Number(set.weight),
                repetitions: Number(set.repetitions),
            })),
        });
    };

    const renderSet = ({item}: {item: ExerciseSetUI}) => (
        <Animated.View
            entering={SlideInRight.duration(200)}
            exiting={SlideOutRight.duration(200)}
            layout={LinearTransition.springify()}
            style={style.renderSetMain}>
            <CustomInput
                value={item.weight}
                onChangeText={text => updateSet(item.uiId, 'weight', text)}
                placeholder={t('weight')}
                containerStyle={{flex: 1}}
                keyboardType="numeric"
                size="small"
            />

            <Text style={style.seriesSeparator}>X</Text>

            <CustomInput
                value={item.repetitions}
                onChangeText={text => updateSet(item.uiId, 'repetitions', text)}
                placeholder={t('repetitions')}
                containerStyle={{flex: 1}}
                keyboardType="numeric"
                size="small"
            />

            <TouchableOpacity style={style.editorDeleteBtn} onPress={() => removeSet(item.uiId)}>
                <Octicons name="trash" size={30} color={Colors.lightRed} />
            </TouchableOpacity>
        </Animated.View>
    );

    const ListFooterComponent = () => (
        <Animated.View layout={LinearTransition.springify().damping(15).stiffness(100)} style={{alignItems: 'center'}}>
            <CircleBtn onPress={addSet} text={'+'} />
        </Animated.View>
    );

    return (
        <View style={{flex: 1}}>
            <FlatList
                ref={flatListRef}
                data={sets}
                keyExtractor={item => item?.uiId}
                renderItem={renderSet}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <CustomInput
                        value={exerciseName}
                        onChangeText={setExerciseName}
                        placeholder={t('exerciseName')}
                        containerStyle={{marginBottom: 30}}
                    />
                }
                ListFooterComponent={ListFooterComponent}
            />

            <View style={style.editorButtons}>
                <CircleBtn onPress={onCancel} text={'X'} textColor={Colors.pink} bgColor={Colors.lightGrey} />
                <CircleBtn onPress={handleSave} text={'OK'} />
            </View>
        </View>
    );
};

export default ExerciseEditorPage;
