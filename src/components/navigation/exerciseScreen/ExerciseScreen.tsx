import {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Layout from '../../common/layout/Layout';
import LiquidProgress from './elements/LiquidProgress';
import {Fonts} from '../../../constants/Fonts';
import {Colors} from '../../../constants/Colors';
import ExerciseBottomManager from './elements/ExerciseBottomManager';
import ClawTitle from '../../common/clawTitle/ClawTitle';
import {useAppNavigation} from '../../../constants/NavigationInterface';
import ExerciseSetRow from './elements/ExerciseSetRow';

const ExerciseScreen = ({route}: any) => {
    const {exercise} = route.params;
    const navigation = useAppNavigation<'BreakScreen'>();
    const [currentIdx, setCurrentIdx] = useState(0);
    const progressPercent = ((currentIdx + 1) / exercise?.sets?.length) * 100 || 0;

    const startBreak = () => {
        navigation.navigate('BreakScreen', {exercise});
    };

    return (
        <Layout hasBackArrow bgImageType="right-center" customStyle={{flex: 1, paddingTop: 80}}>
            <LiquidProgress percent={progressPercent} size={160} />
            <ClawTitle text={exercise.exerciseName} style={{marginTop: 20}} />

            <FlatList
                showsVerticalScrollIndicator={false}
                data={exercise.sets}
                keyExtractor={(_, i) => i.toString()}
                contentContainerStyle={styles.listPadding}
                renderItem={({item, index}) => (
                    <ExerciseSetRow set={item} index={index} isActive={index === currentIdx} isCompleted={index < currentIdx} />
                )}
            />

            <ExerciseBottomManager isBreakActive={false} secondsLeft={60} onStartBreak={startBreak} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    listPadding: {
        paddingTop: 30,
        paddingBottom: 150,
        paddingHorizontal: 15,
    },
    exerciseName: {
        fontFamily: Fonts.light,
        fontSize: 23,
        color: Colors.white,
    },
});

export default ExerciseScreen;
