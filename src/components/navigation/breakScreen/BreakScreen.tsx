import {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {cancelAnimation, Easing, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';
import notifee, {AndroidImportance, AndroidVisibility} from '@notifee/react-native';
import {IExercise} from '../../../constants/interfaces';
import Layout from '../../common/layout/Layout';
import GorillaImage from '../../../assets/images/png/layout/break-monkey.png';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';
import {setAddBreakTimeHandler} from './breakTimerNotificationActions';
import {useTranslation} from 'react-i18next';
import {useAppNavigation} from '../../../constants/NavigationInterface';
import CustomButton from '../../common/cuctomBtn/CustomButton';

const BREAK_DURATION = 20;
const SIZE = 240;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type BreakScreenProps = {
    route: {
        params?: {
            duration?: number;
            exercise: IExercise;
            setIndex: number;
            totalSets: number;
            isLastSet: boolean;
            endsAt?: number;
        };
    };
};

const NOTIFICATION_ID = 'break_timer_notification';
const END_NOTIFICATION_ID = 'break_end_notification';
const TIMER_CHANNEL_ID = 'break_timer_public_silent_channel';
const END_CHANNEL_ID = 'break_end_public_channel';

notifee.registerForegroundService(notification => {
    return new Promise(() => {
        // Usługa działa w tle, dopóki nie wywołamy stopForegroundService()
    });
});

const BreakScreen = ({route}: BreakScreenProps) => {
    const remainingFromRoute = route.params?.endsAt ? Math.ceil((route.params.endsAt - Date.now()) / 1000) : undefined;
    const initialDuration = Math.max(0, remainingFromRoute ?? route.params?.duration ?? BREAK_DURATION);
    const [secondsLeft, setSecondsLeft] = useState(initialDuration);
    const {t} = useTranslation();
    const endsAtRef = useRef(route.params?.endsAt ?? Date.now() + initialDuration * 1000);
    const totalDurationRef = useRef(initialDuration);
    const timerStartedAtRef = useRef(Date.now());

    const progress = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
    }));

    const exercise = route.params?.exercise;
    const navigation = useAppNavigation<'BreakScreen'>();
    const isLastSet = route.params?.isLastSet ?? false;

    const continueWorkout = () => {
        navigation.popToTop();
        navigation.navigate(
            'ExerciseScreen' as never,
            {
                exercise,
                completedSets: (route.params?.setIndex ?? 0) + 1,
            } as never,
        );
    };

    const displayEndNotification = async () => {
        await notifee.cancelNotification(NOTIFICATION_ID);
        await notifee.displayNotification({
            id: END_NOTIFICATION_ID,
            title: `${t('breakEndTitle')}`,
            body: `${t('breakEndDesc')}`,
            data: {
                destination: 'ExerciseScreen',
                exercise: JSON.stringify(exercise),
                navigationRequestId: Date.now().toString(),
            },
            android: {
                channelId: END_CHANNEL_ID,
                importance: AndroidImportance.HIGH,
                onlyAlertOnce: true,
                visibility: AndroidVisibility.PUBLIC,
                pressAction: {id: 'open_exercise', launchActivity: 'com.beaston.app.MainActivity'},
            },
        });
    };

    const displayTimerNotification = async (remaining: number, total: number) => {
        try {
            const minutes = Math.floor(remaining / 60)
                .toString()
                .padStart(2, '0');
            const seconds = (remaining % 60).toString().padStart(2, '0');

            await notifee.displayNotification({
                id: NOTIFICATION_ID,
                title: 'Trwa przerwa 🦍',
                body: `Pozostało: ${minutes}:${seconds}`,
                data: {
                    destination: 'BreakScreen',
                    exercise: JSON.stringify(exercise),
                    duration: remaining,
                    endsAt: endsAtRef.current,
                    setIndex: route.params?.setIndex ?? 0,
                    totalSets: route.params?.totalSets ?? 1,
                    isLastSet: isLastSet ? 'true' : 'false',
                    navigationRequestId: `break-${route.params?.setIndex ?? 0}-${endsAtRef.current}`,
                },
                android: {
                    channelId: TIMER_CHANNEL_ID,
                    ongoing: true,
                    onlyAlertOnce: true,
                    asForegroundService: true,
                    visibility: AndroidVisibility.PUBLIC,
                    progress: {
                        max: total,
                        current: total - remaining,
                        indeterminate: false,
                    },
                    pressAction: {id: 'open_break', launchActivity: 'com.beaston.app.MainActivity'},
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

    useEffect(() => setAddBreakTimeHandler(() => handleAddTime(30)), []);

    const handleAddTime = async (secondsToAdd: number) => {
        endsAtRef.current += secondsToAdd * 1000;
        totalDurationRef.current += secondsToAdd;
        timerStartedAtRef.current =
            Date.now() - (totalDurationRef.current - Math.max(0, Math.ceil((endsAtRef.current - Date.now()) / 1000))) * 1000;

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
                id: TIMER_CHANNEL_ID,
                name: 'Przerwa (cicha)',
                importance: AndroidImportance.LOW,
                visibility: AndroidVisibility.PUBLIC,
                sound: undefined,
                vibration: false,
            });

            await notifee.createChannel({
                id: END_CHANNEL_ID,
                name: 'Koniec przerwy',
                importance: AndroidImportance.HIGH,
                sound: 'default',
                vibration: true,
                visibility: AndroidVisibility.PUBLIC,
            });

            endsAtRef.current = route.params?.endsAt ?? Date.now() + initialDuration * 1000;
            totalDurationRef.current = Math.max(initialDuration, route.params?.duration ?? initialDuration);
            timerStartedAtRef.current = endsAtRef.current - totalDurationRef.current * 1000;

            if (initialDuration === 0) {
                setSecondsLeft(0);
                await notifee.stopForegroundService();
                return;
            }

            const elapsed = Math.max(0, totalDurationRef.current - initialDuration);
            progress.value = elapsed / totalDurationRef.current;
            progress.value = withTiming(1, {
                duration: initialDuration * 1000,
                easing: Easing.linear,
            });

            await displayTimerNotification(initialDuration, initialDuration);

            interval = setInterval(async () => {
                const remaining = Math.max(0, Math.ceil((endsAtRef.current - Date.now()) / 1000));
                setSecondsLeft(remaining);

                if (remaining > 0) {
                    await displayTimerNotification(remaining, totalDurationRef.current);
                }

                if (remaining === 0) {
                    clearInterval(interval);
                    await notifee.stopForegroundService();
                    await displayEndNotification();
                }
            }, 1000);
        };

        setupAndRun();

        return () => {
            clearInterval(interval);
            cancelAnimation(progress);
            notifee.stopForegroundService();
        };
    }, [isLastSet]);

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

                <View style={styles.buttonsWrapper}>
                    <CustomButton
                        onPress={() => handleAddTime(30)}
                        text={'+30 SEKUND'}
                        style={{
                            position: 'absolute',
                            top: 600,
                        }}
                    />
                    {secondsLeft === 0 && (
                        <CustomButton
                            onPress={continueWorkout}
                            text={isLastSet ? t('exerciseCompleteTitle') : t('returnToExercise')}
                            style={{
                                position: 'absolute',
                                top: 660,
                            }}
                        />
                    )}
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
    buttonsWrapper: {
        alignItems: 'center',
        paddingHorizontal: 20,
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
