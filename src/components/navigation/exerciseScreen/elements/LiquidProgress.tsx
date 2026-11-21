import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Animated, {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {useCallback, useMemo} from 'react';

type LiquidProgressProps = {
    percent?: number;
    size?: number;
};

const WAVE_AMPLITUDE = 10;

const createWavePath = (size: number, waveCount: number) => {
    const width = size * waveCount;
    let path = `M 0 ${WAVE_AMPLITUDE}`;

    for (let wave = 0; wave < waveCount; wave += 1) {
        path += ` q ${size / 4} ${-WAVE_AMPLITUDE} ${size / 2} 0 t ${size / 2} 0`;
    }

    return `${path} v ${size} h ${-width} Z`;
};

const LiquidProgress = ({percent = 40, size = 250}: LiquidProgressProps) => {
    const isFocused = useIsFocused();
    const frontWaveX = useSharedValue(0);
    const backWaveX = useSharedValue(0);
    const liquidLevel = useSharedValue(size);
    const normalizedPercent = Math.max(0, Math.min(percent, 100));

    const frontWavePath = useMemo(() => createWavePath(size, 2), [size]);
    const backWavePath = useMemo(() => createWavePath(size, 4), [size]);

    useFocusEffect(
        useCallback(() => {
            frontWaveX.value = 0;
            backWaveX.value = 0;
            frontWaveX.value = withRepeat(withTiming(-size, {duration: 3000, easing: Easing.linear}), -1, false);
            backWaveX.value = withRepeat(withTiming(size, {duration: 3500, easing: Easing.linear}), -1, false);

            return () => {
                cancelAnimation(frontWaveX);
                cancelAnimation(backWaveX);
            };
        }, [backWaveX, frontWaveX, size]),
    );

    useEffect(() => {
        if (!isFocused) return;

        liquidLevel.value = withTiming(size * (1 - normalizedPercent / 100), {
            duration: 800,
            easing: Easing.out(Easing.quad),
        });

        return () => cancelAnimation(liquidLevel);
    }, [isFocused, liquidLevel, normalizedPercent, size]);

    const frontWaveStyle = useAnimatedStyle(() => ({
        transform: [{translateX: frontWaveX.value}, {translateY: liquidLevel.value - WAVE_AMPLITUDE}],
    }));
    const backWaveStyle = useAnimatedStyle(() => ({
        transform: [{translateX: backWaveX.value}, {translateY: liquidLevel.value - WAVE_AMPLITUDE - 2}],
    }));

    return (
        <View style={styles.container}>
            <View style={[styles.decorCircle, {top: 20, left: 10, width: 30, height: 30}]} />
            <View style={[styles.decorCircle, {bottom: 40, right: 10, width: 50, height: 50, opacity: 0.5}]} />

            <View style={[styles.circleWrapper, {width: size, height: size, borderRadius: size / 2}]}>
                <Animated.View
                    pointerEvents="none"
                    style={[styles.waveLayer, {left: -size * 2, width: size * 4, height: size}, backWaveStyle]}>
                    <Svg width={size * 4} height={size} viewBox={`0 0 ${size * 4} ${size}`}>
                        <Path d={backWavePath} fill="#A3243D" opacity={0.4} />
                    </Svg>
                </Animated.View>

                <Animated.View
                    pointerEvents="none"
                    style={[styles.waveLayer, {width: size * 2, height: size}, frontWaveStyle]}>
                    <Svg width={size * 2} height={size} viewBox={`0 0 ${size * 2} ${size}`}>
                        <Path d={frontWavePath} fill="#A3243D" />
                    </Svg>
                </Animated.View>

                <View style={styles.textContainer}>
                    <Text style={styles.percentText}>{Math.round(normalizedPercent)}%</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleWrapper: {
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 15},
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 15,
    },
    waveLayer: {
        position: 'absolute',
        top: 0,
    },
    decorCircle: {
        position: 'absolute',
        backgroundColor: '#A3243D',
        borderRadius: 100,
    },
    textContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentText: {
        color: 'white',
        fontSize: 46,
        fontWeight: '200',
        letterSpacing: -2,
    },
});

export default LiquidProgress;
