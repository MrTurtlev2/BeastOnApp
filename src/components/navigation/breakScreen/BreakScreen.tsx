import {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {cancelAnimation, Easing, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';

import Layout from '../../common/layout/Layout';
import GorillaImage from '../../../assets/images/png/layout/break-monkey.png';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';

const BREAK_DURATION = 60;

const SIZE = 240;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type BreakScreenProps = {
    route: {
        params?: {
            duration?: number;
        };
    };
};

const BreakScreen = ({route}: BreakScreenProps) => {
    const duration = Math.max(1, route.params?.duration ?? BREAK_DURATION);

    const [secondsLeft, setSecondsLeft] = useState(duration);

    const progress = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
    }));

    useEffect(() => {
        const startedAt = Date.now();
        const endsAt = startedAt + duration * 1000;

        progress.value = 0;

        progress.value = withTiming(1, {
            duration: duration * 1000,
            easing: Easing.linear,
        });

        const interval = setInterval(() => {
            const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));

            setSecondsLeft(prev => (prev === remaining ? prev : remaining));

            if (remaining === 0) {
                clearInterval(interval);
            }
        }, 250);

        return () => {
            clearInterval(interval);
            cancelAnimation(progress);
        };
    }, [duration, progress]);

    const formattedTime = `${Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, '0')}:${(secondsLeft % 60).toString().padStart(2, '0')}`;

    return (
        <Layout hasBackArrow bgImageType="none" customStyle={{flex: 1, paddingTop: 80}}>
            <View style={styles.container}>
                <Image source={GorillaImage} resizeMode="stretch" style={styles.gorilla} />

                <View style={styles.timerContainer}>
                    <Svg width={SIZE} height={SIZE}>
                        <Circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} stroke="#1C1C1C" strokeWidth={STROKE_WIDTH} fill="none" />
                        <AnimatedCircle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            stroke={Colors.pink}
                            strokeWidth={STROKE_WIDTH}
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray={CIRCUMFERENCE}
                            animatedProps={animatedProps}
                            rotation="-90"
                            origin={`${SIZE / 2}, ${SIZE / 2}`}
                        />
                    </Svg>

                    <View style={styles.timerContent}>
                        <Text style={styles.timer}>{formattedTime}</Text>
                        <Text style={styles.timerSubtitle}>PRZERWA</Text>
                    </View>
                </View>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    gorilla: {
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 420,
    },
    timerContainer: {
        position: 'absolute',
        top: 320,
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerContent: {
        position: 'absolute',
        alignItems: 'center',
    },
    timer: {
        color: '#FFFFFF',
        fontSize: 48,
        letterSpacing: 3,
        fontFamily: Fonts.Marker,
    },
    timerSubtitle: {
        fontFamily: Fonts.regular,
        color: Colors.white,
        fontSize: 16,
    },
});

export default BreakScreen;
