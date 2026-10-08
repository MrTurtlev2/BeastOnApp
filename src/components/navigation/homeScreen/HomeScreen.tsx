import {Animated} from 'react-native';
import Layout from '../../common/layout/Layout';
import CustomWeekPicker from './elements/CustomWeekPicker/CustomWeekPicker';
import {useAppDispatch, useAppSelector} from '../../../store';
import ExerciseBar from './elements/ExerciseBar/ExerciseBar';
import {useCallback, useMemo, useRef} from 'react';
import {IExercise} from '../../../constants/interfaces';
import HomeEmptyListComponent from './elements/HomeEmptyListComponent/HomeEmptyListComponent';
import BottomSheet from '@gorhom/bottom-sheet';
import TrainingSelectBottomSheet from './elements/TrainingSelectBottomSheet/TrainingSelectBottomSheet';
import SyncDebugModal from '../../debug/syncDebugModal/SyncDebugModal';
import {assignTrainingPlanToAnotherDay, removeTrainingPlan} from '../../../store/trainingPlansSlice';
import {addToOutbox} from '../../../store/outboxSlice';
import {triggerSync} from '../../../store/syncEngine';
import {useAppNavigation} from '../../../constants/NavigationInterface';
import {useWeekDays} from '../../../hooks/useWeekDays';
import CustomBottomSheet from '../../common/bottomSheet/CustomBottomSheet';
import ActionsOnPlanBottomSheet from './elements/ActionsOnPlanBottomSheet/ActionsOnPlanBottomSheet';
import CircleBtn from '../../common/CircleBtn/CircleBtn';
import KebabMenuSvg from '../../../assets/images/svg/common/KebabMenuSvg';
import {style} from './Style';

export default function HomeScreen() {
    const navigation = useAppNavigation<'HomeScreen'>();
    const user = useAppSelector(state => state?.user?.userData);
    const {trainingPlans, loading} = useAppSelector(state => state?.trainingPlans);
    const dispatch = useAppDispatch();
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 90;
    const stickyThreshold = 160;
    const bottomSheetRef = useRef<BottomSheet>(null);
    const onPlanActionsRef = useRef<BottomSheet>(null);
    const {weekDays, selectedDay, onSelectDay} = useWeekDays();

    const planForToday = useMemo(() => {
        return trainingPlans.find(item => item.daysOfWeek.includes(selectedDay + 1));
    }, [selectedDay, trainingPlans]);

    const navigateToExercise = useCallback((item: IExercise) => {
        navigation.push('ExerciseScreen', {exercise: item});
    }, []);

    const onCreatePlan = useCallback(() => {
        navigation.navigate('AddPlanScreen', {selectedDay: selectedDay + 1});
    }, [selectedDay]);

    const onEditPlan = useCallback(() => {
        onPlanActionsRef.current.close();
        navigation.navigate('AddPlanScreen', {selectedDay: selectedDay + 1, existingPlan: planForToday});
    }, [planForToday]);

    const onRemovePlan = () => {
        dispatch(removeTrainingPlan(planForToday.uuid));
        dispatch(
            addToOutbox({
                url: `/api/training-plans/remove-plan/${planForToday.uuid}`,
                method: 'DELETE',
            }),
        );
        triggerSync();
        onPlanActionsRef.current.close();
    };

    const assignPlanToThisDay = (uuid: string) => {
        dispatch(assignTrainingPlanToAnotherDay({uuid, dayToAssign: selectedDay + 1}));
        dispatch(
            addToOutbox({
                url: `/api/training-plans/assign-plan-to-day`,
                method: 'POST',
                body: {uuid, day: selectedDay + 1},
            }),
        );
        triggerSync();
        bottomSheetRef.current?.close();
    };

    const openSelectTrainingPanel = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    const headerElement = (
        <Animated.View
            style={{
                marginTop: '40%',
                alignItems: 'center',
                marginBottom: 50,
                height: headerHeight,
                transform: [
                    {
                        translateY: scrollY.interpolate({
                            inputRange: [0, stickyThreshold],
                            outputRange: [0, -stickyThreshold],
                            extrapolate: 'clamp',
                        }),
                    },
                ],
            }}>
            <CustomWeekPicker weekDays={weekDays} selectedDay={selectedDay} setSelectedDay={onSelectDay} />
        </Animated.View>
    );

    const renderExerciseItem = useCallback(
        ({item}: {item: IExercise}) => (
            <ExerciseBar exerciseName={item?.name} onPress={() => navigateToExercise(item)} containerStyle={{marginHorizontal: 25}} />
        ),
        [],
    );

    return (
        <Layout hasBurger>
            <SyncDebugModal />

            <Animated.FlatList
                ListHeaderComponent={headerElement}
                data={planForToday?.exercises || []}
                renderItem={renderExerciseItem}
                ListEmptyComponent={
                    <HomeEmptyListComponent
                        customerName={user?.customerName}
                        onCreatePlan={onCreatePlan}
                        onAssignPlan={openSelectTrainingPanel}
                    />
                }
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
            />
            {planForToday && (
                <CircleBtn
                    onPress={() => onPlanActionsRef.current.expand()}
                    size={80}
                    icon={<KebabMenuSvg />}
                    customStyle={style.moreOptionsBtn}
                />
            )}
            <CustomBottomSheet ref={bottomSheetRef}>
                <TrainingSelectBottomSheet trainings={trainingPlans} onSelectTraining={assignPlanToThisDay} />
            </CustomBottomSheet>

            <CustomBottomSheet ref={onPlanActionsRef}>
                <ActionsOnPlanBottomSheet onEdit={onEditPlan} onConfirmRemove={onRemovePlan} />
            </CustomBottomSheet>
        </Layout>
    );
}
