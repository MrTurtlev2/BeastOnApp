import Layout from '../../common/layout/Layout';
import PagerView from 'react-native-pager-view';
import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import PlanOverviewPage from './pages/PlanOverviewPage';
import ExerciseEditorPage from './pages/ExerciseEditorPage';
import {IExercise} from '../../../constants/interfaces';

const AddPlanScreen = () => {
    const {t} = useTranslation();
    const pagerRef = useRef<PagerView>(null);
 
    const [planName, setPlanName] = useState<string>('');
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [currentExercise, setCurrentExercise] = useState<IExercise | null>(null);

    const goToEditor = (exercise?: IExercise) => {
        setCurrentExercise(exercise ? {...exercise, sets: [...exercise?.sets]} : {name: '', sets: []});
        pagerRef.current?.setPage(1);
    };

    const goToOverview = () => {
        setCurrentExercise(null);
        pagerRef.current?.setPage(0);
    };

    const handleSaveExercise = (exercise: IExercise) => {
        if (!exercise.name.trim()) {
            goToOverview();
            return;
        }

        setExercises(prev => {
            const existingIndex = prev?.findIndex(e => e?.name === exercise?.name);
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = exercise;
                return updated;
            }
            return [...prev, exercise];
        });

        goToOverview();
    };

    return (
        <Layout hasBackArrow bgImageType={'right-center'} customStyle={{flex: 1, paddingTop: 80}}>
            {/*@ts-ignore*/}
            <PagerView ref={pagerRef} style={{flex: 1, height: '100%', width: '100%'}} initialPage={0} scrollEnabled={false}>
                <View key="1" style={{flex: 1}}>
                    <PlanOverviewPage
                        planName={planName}
                        setPlanName={setPlanName}
                        exercises={exercises}
                        onAddExercise={() => goToEditor()}
                        onEditExercise={exercise => goToEditor(exercise)}
                    />
                </View>

                <View key="2" style={{flex: 1}}>
                    <ExerciseEditorPage
                        key={currentExercise ? currentExercise?.name : 'new'}
                        existingExercise={currentExercise}
                        onSave={handleSaveExercise}
                        onCancel={goToOverview}
                    />
                </View>
            </PagerView>
        </Layout>
    );
};

export default AddPlanScreen;
