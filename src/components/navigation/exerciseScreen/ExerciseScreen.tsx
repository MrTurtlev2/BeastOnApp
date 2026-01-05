import {useRef, useState} from 'react';
import {Animated, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Layout from '../../common/layout/Layout';
import TimelineItem from './elements/TimelineItem';
import {Ionicons} from '@expo/vector-icons';
import LiquidProgress from './elements/LiquidProgress';
import {Fonts} from '../../../constants/Fonts';
import {Colors} from '../../../constants/Colors';
import ClawMarksSvg from '../../../assets/images/svg/common/ClawMarksSvg';
import ExerciseBottomManager from './elements/ExerciseBottomManager';

const ExerciseScreen = ({route}: any) => {
    const {exercise} = route.params;
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const progressAnim = useRef(new Animated.Value(0)).current;

    const handleNextStep = () => {
        if (currentIdx >= exercise.sets.length - 1) return;

        setIsMoving(true);
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        }).start(({finished}) => {
            if (finished) {
                setIsMoving(false);
                setCurrentIdx(prev => prev + 1);
                progressAnim.setValue(0);
            }
        });
    };
    return (
        <Layout hasBackArrow bgImageType={'right-center'} customStyle={{flex: 1, paddingTop: 80, width: '100%'}}>
            <LiquidProgress percent={20} size={160} />
            <View style={{position: 'relative'}}>
                <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
                <ClawMarksSvg />
                {/*<Image source={ClawMarksPNG} />*/}
            </View>
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
                            index === currentIdx && !isMoving ? (
                                <TouchableOpacity onPress={handleNextStep}>
                                    <Ionicons name="time-outline" size={36} color="#E94560" />
                                </TouchableOpacity>
                            ) : index === currentIdx && isMoving ? (
                                <Ionicons name="ellipsis-horizontal" size={30} color="#E94560" />
                            ) : null
                        }
                    />
                )}
            />
            <ExerciseBottomManager />
        </Layout>
    );
};

const styles = StyleSheet.create({
    listPadding: {paddingVertical: 30, paddingHorizontal: 15},
    exerciseName: {
        fontFamily: Fonts.light,
        fontSize: 23,
        color: Colors.white,
    },
});

export default ExerciseScreen;
