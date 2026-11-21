import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

type NotificationNavigationData = {[key: string]: string | undefined};

let pendingExerciseNotification: NotificationNavigationData | null = null;
let lastHandledNotificationId: string | undefined;
let pendingBreakNotification: NotificationNavigationData | null = null;

export function navigate(name: string, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name as never, params as never);
    } else {
        console.warn('Navigation not ready yet');
    }
}

export function navigateToExerciseFromNotification(data?: {[key: string]: string | undefined}) {
    if (!data?.exercise) return;

    if (data.navigationRequestId && data.navigationRequestId === lastHandledNotificationId) return;

    pendingExerciseNotification = data;
    processPendingNotificationNavigation();
}

export function navigateToBreakFromNotification(data?: NotificationNavigationData) {
    if (!data?.exercise) return;
    pendingBreakNotification = data;
    processPendingNotificationNavigation();
}

export function processPendingNotificationNavigation() {
    const breakData = pendingBreakNotification;
    if (breakData?.exercise && navigationRef.isReady()) {
        try {
            const exercise = JSON.parse(breakData.exercise);
            const endsAt = Number(breakData.endsAt);
            const duration = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
            navigationRef.resetRoot({
                index: 0,
                routes: [
                    {
                        name: 'AppRoot',
                        state: {
                            index: 0,
                            routes: [
                                {
                                    name: 'Home',
                                    state: {
                                        index: 1,
                                        routes: [
                                            {name: 'HomeMain'},
                                            {
                                                name: 'ExerciseScreen',
                                                params: {exercise, completedSets: Number(breakData.setIndex ?? 0)},
                                            },
                                            {
                                                name: 'BreakScreen',
                                                params: {
                                                    exercise,
                                                    duration,
                                                    endsAt,
                                                    setIndex: Number(breakData.setIndex ?? 0),
                                                    totalSets: Number(breakData.totalSets ?? exercise.sets?.length ?? 1),
                                                    isLastSet: breakData.isLastSet === 'true',
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            } as never);
            pendingBreakNotification = null;
            return;
        } catch (error) {
            console.warn('Could not open break from notification:', error);
            pendingBreakNotification = null;
        }
    }

    const data = pendingExerciseNotification;
    if (!data?.exercise || !navigationRef.isReady()) return;

    try {
        const exercise = JSON.parse(data.exercise);
        navigationRef.resetRoot({
            index: 0,
            routes: [
                {
                    name: 'AppRoot',
                    state: {
                        index: 0,
                        routes: [
                            {
                                name: 'Home',
                                state: {
                                    index: 1,
                                    routes: [{name: 'HomeMain'}, {name: 'ExerciseScreen', params: {exercise}}],
                                },
                            },
                        ],
                    },
                },
            ],
        } as never);
        if (data.navigationRequestId) lastHandledNotificationId = data.navigationRequestId;
        pendingExerciseNotification = null;
    } catch (error) {
        console.warn('Could not open exercise from notification:', error);
        pendingExerciseNotification = null;
    }
}
