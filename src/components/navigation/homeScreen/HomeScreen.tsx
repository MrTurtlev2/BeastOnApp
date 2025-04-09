import React from 'react';
import {Animated, FlatList, Text, View} from 'react-native';
import Layout from '../../common/layout/Layout.tsx';
import {useTranslation} from 'react-i18next';
import CustomWeekPicker from './elements/CustomWeekPicker/CustomWeekPicker.tsx';
import {useAppDispatch, useAppSelector} from '../../../store';
import CircleBtn from '../../common/CircleBtn/CircleBtn.tsx';
import {style} from './Style.ts';
import GraphSvg from '../../../assets/images/svg/buttons/GraphSvg';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice.ts';
import ExerciseBar from './elements/ExerciseBar/ExerciseBar.tsx';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function HomeScreen() {
    const {t} = useTranslation();
    const user = useAppSelector(state => state.user.userData);
    const {trainingPlans, loading} = useAppSelector(state => state.trainingPlans);
    const dispatch = useAppDispatch();

    const scrollY = new Animated.Value(0);
    const headerHeight = 90;
    const stickyThreshold = 160;

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
            <CustomWeekPicker />
        </Animated.View>
    );

    const EmptyListComponent = () => (
        <View style={{alignItems: 'center'}}>
            <Text style={style.welcomeText}>
                Hej <Text style={style.welcomeUserName}>{user?.customerName}</Text>!
            </Text>
            <Text style={style.secondWelcomeText}>{t('configureTodayTraining')}</Text>

            <CircleBtn icon={<GraphSvg />} onPress={() => fetchPlans()} />
        </View>
    );

    return (
        <Layout>
            <AnimatedFlatList
                ListHeaderComponent={<Header />}
                data={trainingPlans[0]?.exercises}
                renderItem={({item}) => <ExerciseBar exerciseName={item?.exerciseName} onPress={() => null} />}
                refreshing={loading}
                onRefresh={fetchPlans}
                ListEmptyComponent={<EmptyListComponent />}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
            />
        </Layout>
    );
}
