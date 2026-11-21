import Layout from '../../common/layout/Layout';
import PagerView from 'react-native-pager-view';
import {SetStateAction, useRef, useState} from 'react';
import {View} from 'react-native';
import PlanOverviewPage from './pages/PlanOverviewPage';
import ExerciseEditorPage from './pages/ExerciseEditorPage';
import {RouteProp, useRoute} from '@react-navigation/core';
import {InitialPlan, PlanFormProvider, usePlanForm} from '../../../context/PlanFormContext';
import {INavigationProps} from '../../../constants/NavigationInterface';
import CustomBottomSheet from '../../common/bottomSheet/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import ExitWithChangesBottomSheet from './elements/ExitWithChangesBottomSheet';
import {useNavigation} from '@react-navigation/native';
import ReassignDayBottomValidator from './elements/ReassignDayBottomValidator';

const AddPlanScreenContent = ({pagerRef}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const validationBottomSheetRef = useRef<BottomSheet>(null);

    const navigation = useNavigation();
    const {onSavePlan, setDaysOfWeek} = usePlanForm();
    const [page, setPage] = useState(0);
    const [dayToReassign, setDayToReassign] = useState<number | null>(null);

    const onGoBack = () => {
        if (page === 1) {
            pagerRef.current?.setPage(0);
            return;
        }
        bottomSheetRef.current?.expand();
    };

    const onConfirmReassign = () => {
        setDaysOfWeek(prev => [...prev, dayToReassign]);
        validationBottomSheetRef.current.close();
        setDayToReassign(null);
    };

    return (
        <Layout hasBackArrow bgImageType="right-center" customStyle={{flex: 1, paddingTop: 80}} onGoBack={onGoBack}>
            {/*@ts-ignore*/}
            <PagerView
                ref={pagerRef}
                style={{flex: 1}}
                initialPage={0}
                scrollEnabled={false}
                onPageSelected={(event: {nativeEvent: {position: SetStateAction<number>}}) => {
                    setPage(event.nativeEvent.position);
                }}>
                <View key="1" style={{flex: 1}}>
                    <PlanOverviewPage
                        validationBottomSheetRef={validationBottomSheetRef}
                        setDayToReassign={(day: number) => setDayToReassign(day)}
                    />
                </View>
                <View key="2" style={{flex: 1}}>
                    <ExerciseEditorPage />
                </View>
            </PagerView>
            <CustomBottomSheet ref={bottomSheetRef}>
                <ExitWithChangesBottomSheet
                    onExitWithSave={onSavePlan}
                    onExitWithoutSave={() => navigation.goBack()}
                    onCancel={() => bottomSheetRef.current.close()}
                />
            </CustomBottomSheet>
            <CustomBottomSheet ref={validationBottomSheetRef}>
                <ReassignDayBottomValidator onConfirm={onConfirmReassign} onCancel={() => validationBottomSheetRef.current.close()} />
            </CustomBottomSheet>
        </Layout>
    );
};

const AddPlanScreen = () => {
    const pagerRef = useRef<PagerView>(null);
    const route = useRoute<RouteProp<INavigationProps, 'AddPlanScreen'>>();
    const {selectedDay, existingPlan} = route?.params;
    const initialPlan: InitialPlan = {
        name: '',
        daysOfWeek: selectedDay ? [selectedDay] : [],
        exercises: [],
    };
    return (
        <PlanFormProvider pagerRef={pagerRef} initialPlan={existingPlan || initialPlan} isUpdateMode={typeof existingPlan !== 'undefined'}>
            <AddPlanScreenContent pagerRef={pagerRef} />
        </PlanFormProvider>
    );
};

export default AddPlanScreen;
