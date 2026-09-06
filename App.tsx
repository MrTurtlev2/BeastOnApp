import 'react-native-get-random-values';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {useEffect} from 'react';
import ToastManager from 'toastify-react-native';
import store, {persistor} from './src/store';
import MainNavigator from './src/components/navigation/AppNavigator';
import CustomToast from './src/components/common/toast/CustomToast';
import {Fonts} from './src/constants/Fonts';
import {handleAutoLogin} from './src/api/Auth';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PersistGate} from 'redux-persist/integration/react';
import {triggerSync} from './src/store/syncEngine';
import NetInfo from '@react-native-community/netinfo';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

SplashScreen.preventAutoHideAsync();

const toastConfig = {
    error: props => <CustomToast {...props} type="error" />,
    success: props => <CustomToast {...props} type="success" />,
    info: props => <CustomToast {...props} type="info" />,
};

const BACKGROUND_SYNC_TASK = 'BACKGROUND_SYNC_TASK';

TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
    try {
        const hasFinished = await triggerSync();
        return hasFinished ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.Failed;
    } catch (err) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

const registerBackgroundTasks = async () => {
    try {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_SYNC_TASK, {
            minimumInterval: 15 * 60, // 15 minut
            stopOnTerminate: false,
            startOnBoot: true,
        });
    } catch (err) {
        console.log('Background task registration failed:', err);
    }
};

export default function App() {
    const [fontsLoaded] = useFonts({
        [Fonts.light]: require('./src/assets/fonts/Lato-Light.ttf'),
        [Fonts.regular]: require('./src/assets/fonts/Lato-Regular.ttf'),
        [Fonts.bold]: require('./src/assets/fonts/Lato-Bold.ttf'),
        [Fonts.Marker]: require('./src/assets/fonts/PermanentMarker-Regular.ttf'),
    });

    useEffect(() => {
        const prepare = async () => {
            if (!fontsLoaded) return;
            try {
                await handleAutoLogin();
                await registerBackgroundTasks();
                triggerSync();
            } catch (e) {
                console.log('Auto login skipped', e);
            }
            {
                await SplashScreen.hideAsync();
            }
        };
        prepare();
    }, [fontsLoaded]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) triggerSync();
        });
        return unsubscribe;
    }, []);

    if (!fontsLoaded) return null;

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <KeyboardProvider>
                <BottomSheetModalProvider>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <MainNavigator />
                            <ToastManager config={toastConfig} />
                        </PersistGate>
                    </Provider>
                </BottomSheetModalProvider>
            </KeyboardProvider>
        </GestureHandlerRootView>
    );
}
