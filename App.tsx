import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/components/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/store';
import './src/language/i18n';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        </GestureHandlerRootView>
    );
}
