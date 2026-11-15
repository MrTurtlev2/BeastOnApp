import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

type NotificationNavigationData = {[key: string]: string | undefined};

let pendingExerciseNotification: NotificationNavigationData | null = null;
let lastHandledNotificationId: string | undefined;

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

export function processPendingNotificationNavigation() {
    const data = pendingExerciseNotification;
    if (!data?.exercise || !navigationRef.isReady()) return;

    try {
        const exercise = JSON.parse(data.exercise);
        navigationRef.resetRoot(
            {
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
                                            {name: 'ExerciseScreen', params: {exercise}},
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            } as never,
        );
        if (data.navigationRequestId) lastHandledNotificationId = data.navigationRequestId;
        pendingExerciseNotification = null;
    } catch (error) {
        console.warn('Could not open exercise from notification:', error);
        pendingExerciseNotification = null;
    }
}
