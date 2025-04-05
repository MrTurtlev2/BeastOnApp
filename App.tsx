import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './src/components/navigation/MainNavigator.tsx';
import {Provider} from 'react-redux';
import store from './src/store';
import AuthNavigator from './src/components/navigation/AuthNavigator.tsx';

export default function App() {
    const isLoggedIn = false;

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Provider store={store}>
                {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
            </Provider>
        </GestureHandlerRootView>
    );
}
