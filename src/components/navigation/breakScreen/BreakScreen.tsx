import {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {cancelAnimation, Easing, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';
import notifee, {AndroidImportance, AndroidVisibility, EventType} from '@notifee/react-native';
import * as Haptics from 'expo-haptics';
import {Audio} from 'expo-av';
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

const NOTIFICATION_ID = 'break_timer_notification';

const BreakScreen = ({route}: BreakScreenProps) => {
    const initialDuration = Math.max(1, route.params?.duration ?? BREAK_DURATION);
    const [secondsLeft, setSecondsLeft] = useState(initialDuration);

    const endsAtRef = useRef(Date.now() + initialDuration * 1000);
    const totalDurationRef = useRef(initialDuration);

    const progress = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
    }));

    const triggerEndAlert = async () => {
        try {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            const {sound} = await Audio.Sound.createAsync(require('../../../assets/sounds/timer-end.mp3'));
            await sound.playAsync();
        } catch (e) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
    };

    const displayTimerNotification = async (remaining: number, total: number) => {
        try {
            const minutes = Math.floor(remaining / 60)
                .toString()
                .padStart(2, '0');
            const seconds = (remaining % 60).toString().padStart(2, '0');

            await notifee.displayNotification({
                id: NOTIFICATION_ID,
                title: 'Trwa przerwa',
                body: `Pozostało: ${minutes}:${seconds}`,
                android: {
                    channelId: 'break_timer_channel',
                    ongoing: true,
                    asForegroundService: true,
                    visibility: AndroidVisibility.PUBLIC,
                    progress: {
                        max: total,
                        current: total - remaining,
                        indeterminate: false,
                    },
                    pressAction: {
                        id: 'default',
                    },
                    actions: [
                        {
                            title: '+30s',
                            pressAction: {id: 'add_30s'},
                        },
                    ],
                },
            });
        } catch (error) {
            console.log('Notification error:', error);
        }
    };

    useEffect(() => {
        return notifee.onBackgroundEvent(async ({type, detail}) => {
            if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'add_30s') {
                handleAddTime(30);
            }
        });
    }, []);

    const handleAddTime = async (secondsToAdd: number) => {
        endsAtRef.current += secondsToAdd * 1000;
        totalDurationRef.current += secondsToAdd;

        const newRemaining = Math.max(0, Math.ceil((endsAtRef.current - Date.now()) / 1000));
        setSecondsLeft(newRemaining);

        const elapsed = totalDurationRef.current - newRemaining;
        progress.value = elapsed / totalDurationRef.current;
        progress.value = withTiming(1, {
            duration: newRemaining * 1000,
            easing: Easing.linear,
        });

        await displayTimerNotification(newRemaining, totalDurationRef.current);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const setupAndRun = async () => {
            await notifee.requestPermission();

            await notifee.createChannel({
                id: 'break_timer_channel',
                name: 'Przerwa',
                importance: AndroidImportance.HIGH,
                visibility: AndroidVisibility.PUBLIC,
            });

            endsAtRef.current = Date.now() + initialDuration * 1000;
            totalDurationRef.current = initialDuration;

            progress.value = 0;
            progress.value = withTiming(1, {
                duration: initialDuration * 1000,
                easing: Easing.linear,
            });

            await displayTimerNotification(initialDuration, initialDuration);

            interval = setInterval(async () => {
                const remaining = Math.max(0, Math.ceil((endsAtRef.current - Date.now()) / 1000));
                setSecondsLeft(remaining);

                if (remaining > 0) await displayTimerNotification(remaining, totalDurationRef.current);

                if (remaining === 0) {
                    clearInterval(interval);
                    await notifee.stopForegroundService();
                    await triggerEndAlert();
                }
            }, 1000);
        };

        setupAndRun();

        return () => {
            clearInterval(interval);
            cancelAnimation(progress);
            notifee.stopForegroundService();
        };
    }, []);

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

                <TouchableOpacity style={styles.addButton} onPress={() => handleAddTime(30)}>
                    <Text style={styles.addButtonText}>+30 SEKUND</Text>
                </TouchableOpacity>
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
    addButton: {
        position: 'absolute',
        top: 600,
        backgroundColor: Colors.pink,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontFamily: Fonts.Marker,
        fontSize: 16,
    },
});

export default BreakScreen;
