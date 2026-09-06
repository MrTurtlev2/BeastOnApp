import {Animated, Pressable, Text} from 'react-native';
import Layout from '../../common/layout/Layout';
import {useTranslation} from 'react-i18next';
import CustomWeekPicker from './elements/CustomWeekPicker/CustomWeekPicker';
import {useAppDispatch, useAppSelector} from '../../../store';
import ExerciseBar from './elements/ExerciseBar/ExerciseBar';
import {useCallback, useMemo, useRef, useState} from 'react';
import {addDays, format, isToday, startOfWeek} from 'date-fns';
import {enUS, pl} from 'date-fns/locale';
import {IExercise, INavigationProps} from '../../../constants/interfaces';
import HomeEmptyListComponent from './elements/HomeEmptyListComponent/HomeEmptyListComponent';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import TrainingSelectBottomSheet from './elements/TrainingSelectBottomSheet/TrainingSelectBottomSheet';
import SyncDebugModal from '../../debug/syncDebugModal/SyncDebugModal';

type HomeStackNavProp = StackNavigationProp<INavigationProps, 'ExerciseScreen'>;

const WEEK_DAYS = ['mondayShort', 'tuesdayShort', 'wednesdayShort', 'thursdayShort', 'fridayShort', 'saturdayShort', 'sundayShort'];

export default function HomeScreen() {
    const navigation = useNavigation<HomeStackNavProp>();
    const user = useAppSelector(state => state?.user?.userData);
    const {trainingPlans, loading} = useAppSelector(state => state?.trainingPlans);
    const dispatch = useAppDispatch();
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 90;
    const stickyThreshold = 160;
    const {t, i18n} = useTranslation();
    const locale = i18n.language === 'pl' ? pl : enUS;
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const today = useMemo(() => new Date(), []);
    const weekStart = useMemo(() => startOfWeek(today, {weekStartsOn: 1}), [today]);

    const weekDays = useMemo(() => {
        return Array.from({length: 7}, (_, i) => {
            const date = addDays(weekStart, i);
            return {
                date,
                dateString: format(date, 'dd', {locale}),
                day: t(WEEK_DAYS[i]),
            };
        });
    }, [weekStart, locale]);

    const [selectedDay, setSelectedDay] = useState<number>(weekDays.findIndex(day => isToday(day.date)) || 0);

    const planForToday = useMemo(() => {
        return trainingPlans.find(item => item.daysOfWeek.includes(selectedDay + 1));
    }, [selectedDay, trainingPlans]);
    console.log(trainingPlans);

    const navigateToExercise = useCallback((item: IExercise) => {
        navigation.push('ExerciseScreen', {exercise: item});
    }, []);

    const onCreatePlan = useCallback(() => {
        navigation.navigate('AddPlanScreen', {selectedDay: selectedDay + 1});
    }, [selectedDay]);

    const onEditPlan = useCallback(() => {
        navigation.navigate('AddPlanScreen', {selectedDay: selectedDay + 1, existingPlan: planForToday});
    }, [selectedDay]);

    const openSelectTrainingPanel = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const onSelectDay = useCallback((index: number) => {
        setSelectedDay(index);
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
            <Pressable onPress={onEditPlan}>
                <Text>tedt</Text>
            </Pressable>
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
            <TrainingSelectBottomSheet ref={bottomSheetRef} trainings={trainingPlans} onSelectTraining={e => console.log(e)} />
        </Layout>
    );
}
