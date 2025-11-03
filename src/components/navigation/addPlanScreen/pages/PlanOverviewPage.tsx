import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../../common/customInput/CustomInput';
import {IExercise} from '../../../../constants/interfaces';
import NewExerciseBar from '../elements/NewExerciseBar';
import PlanOverviewFooter from '../elements/PlanOverviewFooter';

type Props = {
    planName: string;
    setPlanName: (val: string) => void;
    exercises: IExercise[];
    onAddExercise: () => void;
    onEditExercise: (exercise: IExercise) => void;
};

const PlanOverviewPage = ({planName, setPlanName, exercises, onAddExercise, onEditExercise}: Props) => {
    const {t} = useTranslation();

    return (
        <View style={{flex: 1}}>
            <CustomInput
                value={planName}
                onChangeText={setPlanName}
                placeholder={t('planName')}
                containerStyle={{marginBottom: 20, marginHorizontal: 20}}
            />

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
                ListFooterComponent={<PlanOverviewFooter onAddExercise={onAddExercise} onSavePlan={undefined} />}
            />
        </View>
    );
};

export default PlanOverviewPage;
