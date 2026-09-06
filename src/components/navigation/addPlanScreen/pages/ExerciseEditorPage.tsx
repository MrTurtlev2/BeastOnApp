import {useRef} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../../common/customInput/CustomInput';
import {style} from '../Style';
import CircleBtn from '../../../common/CircleBtn/CircleBtn';
import {Colors} from '../../../../constants/Colors';
import {Toast} from 'toastify-react-native';
import Octicons from '@expo/vector-icons/Octicons';
import Animated, {LinearTransition, SlideInRight, SlideOutRight} from 'react-native-reanimated';
import {ExerciseSetUI, usePlanForm} from '../../../../context/PlanFormContext';

const ExerciseEditorPage = () => {
    const {t} = useTranslation();

    const flatListRef = useRef<FlatList>(null);

    const {exerciseName, sets, setExerciseName, addSet, removeSet, updateSet, saveExercise, cancelExercise} = usePlanForm();

    const handleAddSet = () => {
        addSet();

        setTimeout(() => {
            flatListRef.current?.scrollToIndex({
                index: sets.length,
                animated: true,
            });
        }, 100);
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

        saveExercise();
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
                containerStyle={{
                    flex: 1,
                }}
                keyboardType="numeric"
                size="small"
            />

            <Text style={style.seriesSeparator}>X</Text>

            <CustomInput
                value={item.repetitions}
                onChangeText={text => updateSet(item.uiId, 'repetitions', text)}
                placeholder={t('repetitions')}
                containerStyle={{
                    flex: 1,
                }}
                keyboardType="numeric"
                size="small"
            />

            <TouchableOpacity style={style.editorDeleteBtn} onPress={() => removeSet(item.uiId)}>
                <Octicons name="trash" size={30} color={Colors.lightRed} />
            </TouchableOpacity>
        </Animated.View>
    );

    const ListFooterComponent = () => (
        <Animated.View
            layout={LinearTransition.springify().damping(15).stiffness(100)}
            style={{
                alignItems: 'center',
            }}>
            <CircleBtn onPress={handleAddSet} text="+" />
        </Animated.View>
    );

    return (
        <View style={{flex: 1}}>
            <FlatList
                ref={flatListRef}
                data={sets}
                keyExtractor={item => item.uiId}
                renderItem={renderSet}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <CustomInput
                        value={exerciseName}
                        onChangeText={setExerciseName}
                        placeholder={t('exerciseName')}
                        containerStyle={{
                            marginBottom: 30,
                        }}
                    />
                }
                ListFooterComponent={ListFooterComponent}
            />

            <View style={style.editorButtons}>
                <CircleBtn onPress={cancelExercise} text="X" textColor={Colors.pink} bgColor={Colors.lightGrey} />

                <CircleBtn onPress={handleSave} text="OK" />
            </View>
        </View>
    );
};

export default ExerciseEditorPage;
