import {useState} from 'react';
import {StyleSheet, type ViewProps} from 'react-native';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import Animated, {Extrapolation, interpolate, useAnimatedReaction, useAnimatedStyle} from 'react-native-reanimated';
import {runOnJS} from 'react-native-worklets';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const CustomBackdrop = ({animatedIndex}) => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.5], Extrapolation.CLAMP),
    }));
    const {close} = useBottomSheet();
    const [pointerEvents, setPointerEvents] = useState<ViewProps['pointerEvents']>('none');

    useAnimatedReaction(
        () => animatedIndex.value >= 0,
        (isVisible, previous) => {
            if (isVisible === previous) {
                return;
            }
            runOnJS(setPointerEvents)(isVisible ? 'auto' : 'none');
        },
    );
    const tapGesture = Gesture.Tap().onEnd(() => {
        runOnJS(close)();
    });

    return (
        <GestureDetector gesture={tapGesture}>
            <Animated.View pointerEvents={pointerEvents} style={[StyleSheet.absoluteFill, styles.backdrop, animatedStyle]} />
        </GestureDetector>
    );
};
export default CustomBackdrop;

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: '#000',
    },
});
