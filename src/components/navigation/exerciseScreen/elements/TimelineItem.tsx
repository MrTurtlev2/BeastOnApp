import {Animated, StyleSheet, View} from 'react-native';
import {ReactNode} from 'react';
import {Colors} from '../../../../constants/Colors';
import ExerciseSetCircle from './ExerciseSetCircle';

interface TimelineItemProps {
    set: {repetitions: number; weight: number};
    index: number;
    isActive: boolean;
    isCompleted: boolean;
    isLast: boolean;
    progressAnim: Animated.Value;
    renderAction: ReactNode;
}

const dotSize = 14;

const TimelineItem = ({set, index, isActive, isCompleted, isLast, progressAnim, renderAction}: TimelineItemProps) => {
    const isLeft = index % 2 === 0;

    const Placeholder = () => <View style={{width: 123, height: 123}} />;

    return (
        <View style={styles.container}>
            {isLeft ? <ExerciseSetCircle set={set} index={index} isActive={isActive} isCompleted={isCompleted} /> : <Placeholder />}
            <View style={styles.axisContainer}>
                <View style={[styles.dot, (isActive || isCompleted) && styles.activeDot]} />
                {!isLast && (
                    <View style={styles.lineBase}>
                        {isActive && (
                            <Animated.View
                                style={[
                                    styles.lineFill,
                                    {
                                        height: progressAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', '100%'],
                                        }),
                                    },
                                ]}
                            />
                        )}
                        {isCompleted && <View style={[styles.lineFill, {height: '100%'}]} />}
                    </View>
                )}
                <View style={styles.actionSlot}>{renderAction}</View>
            </View>
            {isLeft ? <Placeholder /> : <ExerciseSetCircle set={set} index={index} isActive={isActive} isCompleted={isCompleted} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    axisContainer: {width: 70, alignItems: 'center', position: 'relative'},
    dot: {
        width: dotSize,
        height: dotSize,
        borderRadius: 7,
        backgroundColor: Colors.lightGrey,
        zIndex: 3,
        marginTop: 45 + dotSize,
    },
    activeDot: {backgroundColor: Colors.pink},
    lineBase: {
        position: 'absolute',
        top: 60 + dotSize - 1, // UI (1px) render correction
        bottom: -60 + 1, // UI (1px) render correction
        width: 2,
        backgroundColor: Colors.lightGrey,
        zIndex: 1,
    },
    lineFill: {width: '100%', backgroundColor: Colors.pink},
    actionSlot: {position: 'absolute', top: 45, zIndex: 4, backgroundColor: Colors.bgGrey, borderRadius: 50},
});

export default TimelineItem;
