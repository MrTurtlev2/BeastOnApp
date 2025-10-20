import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './src/components/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/store';
import './src/language/i18n';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {Fonts} from './src/constants/Fonts';
import {useEffect} from 'react';
import ToastManager from 'toastify-react-native';
import ErrorToast from './src/components/common/toast/ErrorToast';

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
        if (fontsLoaded) SplashScreen.hideAsync();
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
