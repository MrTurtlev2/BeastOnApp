import Layout from '../../common/layout/Layout';
import PagerView from 'react-native-pager-view';
import {useRef} from 'react';
import {View} from 'react-native';
import PlanOverviewPage from './pages/PlanOverviewPage';
import ExerciseEditorPage from './pages/ExerciseEditorPage';
import {useRoute} from '@react-navigation/core';
import {InitialPlan, PlanFormProvider} from '../../../context/PlanFormContext';

const AddPlanScreen = () => {
    const route = useRoute();
    const {selectedDay, existingPlan} = route?.params || {};

    const pagerRef = useRef<PagerView>(null);

    const initialPlan: InitialPlan = {
        name: '',
        daysOfWeek: selectedDay ? [selectedDay] : [],
        exercises: [],
    };
    return (
        <PlanFormProvider pagerRef={pagerRef} initialPlan={existingPlan || initialPlan}>
            <Layout hasBackArrow bgImageType="right-center" customStyle={{flex: 1, paddingTop: 80}}>
                {/*@ts-ignore*/}
                <PagerView ref={pagerRef} style={{flex: 1}} initialPage={0} scrollEnabled={false}>
                    <View key="1" style={{flex: 1}}>
                        <PlanOverviewPage />
                    </View>
                    <View key="2" style={{flex: 1}}>
                        <ExerciseEditorPage />
                    </View>
                </PagerView>
            </Layout>
        </PlanFormProvider>
    );
};

export default AddPlanScreen;
