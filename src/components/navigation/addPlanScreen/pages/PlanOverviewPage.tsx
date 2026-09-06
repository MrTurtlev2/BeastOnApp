import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../../common/customInput/CustomInput';
import NewExerciseBar from '../elements/NewExerciseBar';
import PlanOverviewFooter from '../elements/PlanOverviewFooter';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../../store';
import {nanoid} from 'nanoid';
import {addTrainingPlan, updateTrainingPlan} from '../../../../store/trainingPlansSlice';
import {addToOutbox} from '../../../../store/outboxSlice';
import {triggerSync} from '../../../../store/syncEngine';
import {usePlanForm} from '../../../../context/PlanFormContext';
import {ITrainingPlan} from '../../../../constants/interfaces';

type PlanOverviewPageType = {
    existingPlan?: ITrainingPlan;
};

const PlanOverviewPage = ({existingPlan}: PlanOverviewPageType) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const {planName, setPlanName, daysOfWeek, exercises, goToEditor} = usePlanForm();
    const [isPlanLoading, setPlanLoading] = useState(false);

    const planObject: ITrainingPlan = {
        uuid: nanoid(),
        name: planName.trim(),
        exercises,
        daysOfWeek,
        lastModified: Date.now(),
    };

    const onSavePlan = async () => {
        setPlanLoading(true);
        if (existingPlan) {
            const updatedPlan = {...planObject, uuid: existingPlan.uuid};
            dispatch(updateTrainingPlan({...updatedPlan, synced: false}));
            dispatch(
                addToOutbox({
                    url: `/api/training-plans/update-plan/${updatedPlan.uuid}`,
                    method: 'PUT',
                    body: updatedPlan,
                }),
            );
        } else {
            dispatch(addTrainingPlan({...planObject, synced: false}));
            dispatch(
                addToOutbox({
                    url: '/api/training-plans/add-plan',
                    method: 'POST',
                    body: planObject,
                }),
            );
        }
        navigation.goBack();
        triggerSync();
    };

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 20,
            }}>
            <CustomInput
                value={planName}
                onChangeText={setPlanName}
                placeholder={t('planName')}
                containerStyle={{
                    marginBottom: 20,
                }}
            />

            <FlatList
                data={exercises}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                    <NewExerciseBar index={index + 1} exerciseName={item.name} onPress={() => goToEditor(item)} />
                )}
                ListEmptyComponent={<Text style={{color: '#aaa'}}>{t('noExercisesAdded') ?? 'Brak ćwiczeń'}</Text>}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<View style={{height: 5}} />}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                }}
                ListFooterComponent={
                    <PlanOverviewFooter onAddExercise={() => goToEditor()} onSavePlan={onSavePlan} isPlanLoading={isPlanLoading} />
                }
            />
        </View>
    );
};

export default PlanOverviewPage;
