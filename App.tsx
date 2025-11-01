import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {useEffect} from 'react';
import ToastManager from 'toastify-react-native';

import store from './src/store';
import MainNavigator from './src/components/navigation/AppNavigator';
import ErrorToast from './src/components/common/toast/ErrorToast';
import {Fonts} from './src/constants/Fonts';
import {handleAutoLogin} from './src/api/Auth';

SplashScreen.preventAutoHideAsync();

const toastConfig = {
    error: props => <ErrorToast {...props} />,
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
            } catch (e) {
                console.log('Auto login skipped', e);
            } finally {
                await SplashScreen.hideAsync();
            }
        };
        prepare();
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Provider store={store}>
                <MainNavigator />
                <ToastManager config={toastConfig} />
            </Provider>
        </GestureHandlerRootView>
    );
}
