import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './src/components/navigation/AppNavigator.tsx';
import {Provider} from 'react-redux';
import store from './src/store';

export default function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        </GestureHandlerRootView>
    );
}
