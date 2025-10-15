import {Animated} from 'react-native';
import Layout from '../../common/layout/Layout';
import {useTranslation} from 'react-i18next';
import CustomWeekPicker from './elements/CustomWeekPicker/CustomWeekPicker';
import {useAppDispatch, useAppSelector} from '../../../store';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice';
import ExerciseBar from './elements/ExerciseBar/ExerciseBar';
import {useState} from 'react';
import {addDays, format, isToday, startOfWeek} from 'date-fns';
import {enUS, pl} from 'date-fns/locale';
import {IExercise} from '../../../constants/interfaces';
import HomeEmptyListComponent from './elements/HomeEmptyListComponent/HomeEmptyListComponent';

export default function HomeScreen() {
    const user = useAppSelector(state => state?.user?.userData);
    const {trainingPlans, loading} = useAppSelector(state => state?.trainingPlans);
    const dispatch = useAppDispatch();
    const scrollY = new Animated.Value(0);
    const headerHeight = 90;
    const stickyThreshold = 160;
    const {t, i18n} = useTranslation();
    const locale = i18n.language === 'pl' ? pl : enUS;
    const today = new Date();
    const weekStart = startOfWeek(today, {weekStartsOn: 1});
    const weekDays = Array.from({length: 7}, (_, i) => {
        const date = addDays(weekStart, i);
        return {
            date,
            dateString: format(date, 'dd', {locale}),
            day: t(['mondayShort', 'tuesdayShort', 'wednesdayShort', 'thursdayShort', 'fridayShort', 'saturdayShort', 'sundayShort'][i]),
        };
    });
    const [selectedDay, setSelectedDay] = useState<number>(weekDays.findIndex(day => isToday(day.date)) || 0);

    const fetchPlans = () => {
        dispatch(loadTrainingPlans());
    };

    const Header = () => (
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
            <CustomWeekPicker weekDays={weekDays} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </Animated.View>
    );

    return (
        <Layout>
            <Animated.FlatList<IExercise>
                ListHeaderComponent={<Header />}
                data={trainingPlans[selectedDay]?.exercises ?? []}
                renderItem={({item}) => <ExerciseBar exerciseName={item?.exerciseName} onPress={() => null} />}
                refreshing={loading}
                onRefresh={fetchPlans}
                ListEmptyComponent={
                    <HomeEmptyListComponent
                        customerName={user?.customerName}
                        onCreatePlan={() => fetchPlans()}
                        onAssignPlan={() => fetchPlans()}
                    />
                }
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
            />
        </Layout>
    );
}
