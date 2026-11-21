import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Layout from '../../common/layout/Layout';
import LiquidProgress from './elements/LiquidProgress';
import {Fonts} from '../../../constants/Fonts';
import {Colors} from '../../../constants/Colors';
import ClawTitle from '../../common/clawTitle/ClawTitle';
import {useAppNavigation} from '../../../constants/NavigationInterface';
import ExerciseSetRow from './elements/ExerciseSetRow';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../common/cuctomBtn/CustomButton';

const ExerciseScreen = ({route}: any) => {
    const {exercise} = route.params;
    const navigation = useAppNavigation<'BreakScreen'>();
    const {t} = useTranslation();
    const [completedSets, setCompletedSets] = useState(0);
    const routeCompletedSets = route.params?.completedSets ?? 0;

    const sets = exercise?.sets ?? [];
    const isComplete = sets.length > 0 && completedSets >= sets.length;
    const currentIdx = Math.min(completedSets, Math.max(sets.length - 1, 0));
    const progressPercent = sets.length ? (completedSets / sets.length) * 100 : 0;

    const startBreak = () => {
        if (isComplete || sets.length === 0) return;
        navigation.navigate('BreakScreen', {
            exercise,
            setIndex: completedSets,
            totalSets: sets.length,
            isLastSet: completedSets === sets.length - 1,
        });
    };

    const finishWorkout = () => navigation.goBack();

    useEffect(() => {
        if (routeCompletedSets > completedSets) setCompletedSets(routeCompletedSets);
    }, [completedSets, routeCompletedSets]);
    return (
        <Layout hasBackArrow bgImageType="right-center" customStyle={{flex: 1, paddingTop: 80}}>
            <View style={styles.container}>
                <LiquidProgress percent={progressPercent} size={160} />
                <ClawTitle text={exercise.exerciseName} style={{marginTop: 20}} />

                {isComplete ? (
                    <View style={styles.completion}>
                        <Text style={styles.completionTitle}>{t('exerciseCompleteTitle')}</Text>
                        <Text style={styles.completionDescription}>{t('exerciseCompleteDesc')}</Text>
                        <TouchableOpacity onPress={finishWorkout} style={styles.finishButton}>
                            <Text style={styles.finishButtonText}>{t('finishWorkout')}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={sets}
                        keyExtractor={(_, i) => i.toString()}
                        contentContainerStyle={styles.listPadding}
                        renderItem={({item, index}) => (
                            <ExerciseSetRow set={item} index={index} isActive={index === currentIdx} isCompleted={index < completedSets} />
                        )}
                    />
                )}

                <CustomButton onPress={startBreak} text={t('break')} style={{position: 'absolute', bottom: 40}} />
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
    },
    listPadding: {
        paddingTop: 30,
        paddingBottom: 150,
    },
    exerciseName: {
        fontFamily: Fonts.light,
        fontSize: 23,
        color: Colors.white,
    },
    completion: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    completionTitle: {fontFamily: Fonts.Marker, fontSize: 27, color: Colors.white, textAlign: 'center'},
    completionDescription: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        color: Colors.white,
        opacity: 0.75,
        textAlign: 'center',
        marginTop: 12,
    },
    finishButton: {
        backgroundColor: Colors.pink,
        borderRadius: 24,
        paddingVertical: 13,
        marginTop: 28,
    },
    finishButtonText: {fontFamily: Fonts.Marker, fontSize: 17, color: Colors.white},
});

export default ExerciseScreen;
