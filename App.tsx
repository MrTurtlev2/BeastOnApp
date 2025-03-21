import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './src/navigation/MainNavigator.tsx';

export default function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <MainNavigator />
        </GestureHandlerRootView>
    );
}
