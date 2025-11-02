import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../../common/customInput/CustomInput';
import ExerciseBar from '../../homeScreen/elements/ExerciseBar/ExerciseBar';
import {IExercise} from '../../../../constants/interfaces';

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
        <View style={{flex: 1, paddingHorizontal: 20}}>
            <CustomInput value={planName} onChangeText={setPlanName} placeholder={t('planName')} containerStyle={{marginBottom: 20}} />

            <FlatList
                data={exercises}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <ExerciseBar exerciseName={item.name} onPress={() => onEditExercise(item)} />}
                ListEmptyComponent={<Text style={{color: '#aaa'}}>{t('noExercisesAdded') ?? 'Brak ćwiczeń'}</Text>}
                showsVerticalScrollIndicator={false}
            />

            <ExerciseBar exerciseName="+" onPress={onAddExercise} />
        </View>
    );
};

export default PlanOverviewPage;
