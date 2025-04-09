import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Layout from '../../common/layout/Layout.tsx';
import {useTranslation} from 'react-i18next';
import CustomWeekPicker from './elements/CustomWeekPicker/CustomWeekPicker.tsx';
import {useAppDispatch, useAppSelector} from '../../../store';
import CircleBtn from '../../common/CircleBtn/CircleBtn.tsx';
import {style} from './Style.ts';
import GraphSvg from '../../../assets/images/svg/buttons/GraphSvg';
import {loadTrainingPlans} from '../../../store/trainingPlansSlice.ts';
import ExerciseBar from './elements/ExerciseBar/ExerciseBar.tsx';

export default function HomeScreen() {
    const {t} = useTranslation();
    const user = useAppSelector(state => state.user.userData);
    const {trainingPlans, loading} = useAppSelector(state => state.trainingPlans);
    const dispatch = useAppDispatch();

    // console.log('user================');
    // console.log(user);

    console.log('data =============');
    console.log(loading, trainingPlans[0]);
    const fetchPlans = () => {
        dispatch(loadTrainingPlans());
    };

    const Header = () => (
        <>
            <View
                style={{
                    flex: 1,
                    marginTop: '40%',
                    alignItems: 'center',
                    marginBottom: 50,
                }}>
                <CustomWeekPicker />
            </View>
        </>
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
            <FlatList
                ListHeaderComponent={<Header />}
                data={trainingPlans[0].exercises}
                // data={[]}
                renderItem={({item}) => <ExerciseBar exerciseName={item.exerciseName} onPress={() => null} />}
                refreshing={loading}
                onRefresh={fetchPlans}
                ListEmptyComponent={<EmptyListComponent />}
                showsVerticalScrollIndicator={false}
            />
        </Layout>
    );
}
