import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import notifee, {EventType} from '@notifee/react-native';
import {RootState} from '../../store';
import HomeScreen from './homeScreen/HomeScreen';
import CustomDrawer from './CustomDrawer';
import RegisterScreen from './registerScreen/RegisterScreen';
import MotivationScreen from './motivationScreen/MotivationScreen';
import LoginScreen from './loginScreen/LoginScreen';
import ErrorScreen from './errorScreen/ErrorScreen';
import {
    navigateToBreakFromNotification,
    navigateToExerciseFromNotification,
    navigationRef,
    processPendingNotificationNavigation,
} from './RootNavigation';
import {Colors} from '../../constants/Colors';
import AddPlanScreen from './addPlanScreen/AddPlanScreen';
import ExerciseScreen from './exerciseScreen/ExerciseScreen';
import BreakScreen from './breakScreen/BreakScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

const HomeStack = createStackNavigator();

const defaultTheme: Theme = {
    dark: true,
    fonts: {},
    colors: {
        background: Colors.bgGrey,
        primary: '',
        card: '',
        text: Colors.white,
        border: '',
        notification: '',
    },
};

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{headerShown: false}} />
            <HomeStack.Screen name="AddPlanScreen" component={AddPlanScreen} />
            <HomeStack.Screen name="ExerciseScreen" component={ExerciseScreen} options={{detachPreviousScreen: false}} />
            <HomeStack.Screen name="BreakScreen" component={BreakScreen} />
        </HomeStack.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerPosition: 'right',
                overlayColor: '#313131C2',
                drawerStyle: {
                    flex: 1,
                    width: 350,
                    paddingRight: 20,
                    backgroundColor: 'transparent',
                },
            }}>
            <Drawer.Screen name="MotivationScreen" component={MotivationScreen} />
            <Drawer.Screen name="Home" component={HomeStackNavigator} />
        </Drawer.Navigator>
    );
};

const RootAppNavigator = () => {
    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    return (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name="AppRoot">{() => (isUserLoggedIn ? <MainNavigator /> : <AuthNavigator />)}</RootStack.Screen>
            <RootStack.Screen name="ErrorScreen" component={ErrorScreen} />
        </RootStack.Navigator>
    );
};

export default function AppNavigator() {
    useEffect(() => {
        const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
            if (type === EventType.PRESS && detail.notification?.data?.destination === 'ExerciseScreen') {
                navigateToExerciseFromNotification(detail.notification.data);
            }
            if (type === EventType.PRESS && detail.notification?.data?.destination === 'BreakScreen') {
                navigateToBreakFromNotification(detail.notification.data);
            }
        });

        notifee.getInitialNotification().then(initialNotification => {
            if (initialNotification?.notification.data?.destination === 'ExerciseScreen') {
                navigateToExerciseFromNotification(initialNotification.notification.data);
            }
            if (initialNotification?.notification.data?.destination === 'BreakScreen') {
                navigateToBreakFromNotification(initialNotification.notification.data);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <NavigationContainer ref={navigationRef} theme={defaultTheme} onReady={processPendingNotificationNavigation}>
            <RootAppNavigator />
        </NavigationContainer>
    );
}
