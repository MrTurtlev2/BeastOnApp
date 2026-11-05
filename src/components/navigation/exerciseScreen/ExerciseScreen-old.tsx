import {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Layout from '../../common/layout/Layout';
import TimelineItem from './elements/TimelineItem';
import {Ionicons} from '@expo/vector-icons';
import LiquidProgress from './elements/LiquidProgress';
import {Fonts} from '../../../constants/Fonts';
import {Colors} from '../../../constants/Colors';
import ExerciseBottomManager from './elements/ExerciseBottomManager';
import ClawTitle from '../../common/clawTitle/ClawTitle';

const BREAK_DURATION = 30;

const ExerciseScreen = ({route}: any) => {
    const {exercise} = route.params;

    const [currentIdx, setCurrentIdx] = useState(0);
    const [isBreakActive, setIsBreakActive] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(BREAK_DURATION);

    const progressAnim = useRef(new Animated.Value(0)).current;
    const timerRef = useRef<number | null>(null);
    const progressPercent = ((currentIdx + 1) / exercise?.sets?.length) * 100 || 0;

    const startBreak = () => {
        if (isBreakActive || currentIdx >= exercise.sets.length - 1) return;

        setIsBreakActive(true);
        setSecondsLeft(BREAK_DURATION);

        Animated.timing(progressAnim, {
            toValue: 1,
            duration: BREAK_DURATION * 1000,
            useNativeDriver: false,
        }).start(({finished}) => {
            if (finished) {
                finishBreak();
            }
        });

        timerRef.current = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    timerRef.current && clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const finishBreak = () => {
        timerRef.current && clearInterval(timerRef.current);

        setIsBreakActive(false);
        setCurrentIdx(prev => prev + 1);
        progressAnim.setValue(0);
    };

    useEffect(() => {
        return () => {
            timerRef.current && clearInterval(timerRef.current);
        };
    }, []);

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
                    <TimelineItem
                        set={item}
                        index={index}
                        isActive={index === currentIdx}
                        isCompleted={index < currentIdx}
                        isLast={index === exercise.sets.length - 1}
                        progressAnim={progressAnim}
                        renderAction={
                            index === currentIdx && !isBreakActive ? (
                                <TouchableOpacity onPress={startBreak}>
                                    <Ionicons name="time-outline" size={36} color={Colors.lightRed} />
                                </TouchableOpacity>
                            ) : index === currentIdx && isBreakActive ? (
                                <Ionicons name="ellipsis-horizontal" size={30} color={Colors.lightRed} />
                            ) : null
                        }
                    />
                )}
            />

            <ExerciseBottomManager isBreakActive={isBreakActive} secondsLeft={secondsLeft} onStartBreak={startBreak} />
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
