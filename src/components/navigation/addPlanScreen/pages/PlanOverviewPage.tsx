import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../../common/customInput/CustomInput';
import {IExercise} from '../../../../constants/interfaces';
import NewExerciseBar from '../elements/NewExerciseBar';
import PlanOverviewFooter from '../elements/PlanOverviewFooter';
import {addPlanAsync} from '../../../../api/trainingPlanService';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {loadTrainingPlans} from '../../../../store/trainingPlansSlice';
import {useAppDispatch} from '../../../../store';

type Props = {
    planName: string;
    setPlanName: (val: string) => void;
    exercises: IExercise[];
    onAddExercise: () => void;
    onEditExercise: (exercise: IExercise) => void;
    selectedDay: number;
};

const PlanOverviewPage = ({exercises, onAddExercise, onEditExercise, selectedDay}: Props) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const [planName, setPlanName] = useState<string>('');
    const [isPlanLoading, setPlanLoading] = useState<boolean>(false);

    const onSavePlan = async () => {
        setPlanLoading(true);
        await addPlanAsync({name: planName, exercises, daysOfWeek: [selectedDay]});
        dispatch(loadTrainingPlans());
        navigation.goBack();
        setPlanLoading(false);
    };

    return (
        <View style={{flex: 1, paddingHorizontal: 20}}>
            <CustomInput value={planName} onChangeText={setPlanName} placeholder={t('planName')} containerStyle={{marginBottom: 20}} />

            <FlatList
                data={exercises}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({item, index}) => (
                    <NewExerciseBar index={index + 1} exerciseName={item?.name} onPress={() => onEditExercise(item)} />
                )}
                ListEmptyComponent={<Text style={{color: '#aaa'}}>{t('noExercisesAdded') ?? 'Brak ćwiczeń'}</Text>}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<View style={{height: 5}} />}
                contentContainerStyle={{paddingHorizontal: 20}}
                ListFooterComponent={
                    <PlanOverviewFooter onAddExercise={onAddExercise} onSavePlan={onSavePlan} isPlanLoading={isPlanLoading} />
                }
            />
        </View>
    );
};

export default PlanOverviewPage;
