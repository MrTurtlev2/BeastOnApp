import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../../common/customInput/CustomInput';
import NewExerciseBar from '../elements/NewExerciseBar';
import PlanOverviewFooter from '../elements/PlanOverviewFooter';
import {useState} from 'react';
import {usePlanForm} from '../../../../context/PlanFormContext';
import CustomWeekPicker from '../../homeScreen/elements/CustomWeekPicker/CustomWeekPicker';
import {useWeekDays} from '../../../../hooks/useWeekDays';

const PlanOverviewPage = () => {
    const {t} = useTranslation();
    const {planName, setPlanName, exercises, goToEditor, onSavePlan, daysOfWeek, setDaysOfWeek} = usePlanForm();
    const [isPlanLoading, setPlanLoading] = useState(false);
    const {weekDays} = useWeekDays();

    const handleSelectDay = (day: number) => {
        setDaysOfWeek(prev => (prev.includes(day) ? prev.filter(item => item !== day) : [...prev, day]));
    };

    const handleSavePlan = async () => {
        setPlanLoading(true);
        onSavePlan();
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
            <CustomWeekPicker weekDays={weekDays} selectedDays={daysOfWeek} onSelectDay={handleSelectDay} />

            <FlatList
                data={exercises}
                keyExtractor={(_, index) => index.toString()}
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
                    <PlanOverviewFooter onAddExercise={() => goToEditor()} onSavePlan={handleSavePlan} isPlanLoading={isPlanLoading} />
                }
            />
        </View>
    );
};

export default PlanOverviewPage;
