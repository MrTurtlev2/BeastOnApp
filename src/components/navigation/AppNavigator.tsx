import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

import HomeScreen from './homeScreen/HomeScreen';
import CustomDrawer from './CustomDrawer';
import RegisterScreen from './registerScreen/RegisterScreen';
import MotivationScreen from './motivationScreen/MotivationScreen';
import LoginScreen from './loginScreen/LoginScreen';
import ErrorScreen from './errorScreen/ErrorScreen';
import {navigationRef} from './RootNavigation';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const AuthNavigator = () => {
    return (
        // @ts-ignore
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    return (
        // @ts-ignore
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerPosition: 'right',
                overlayColor: 'transparent',
                drawerStyle: {
                    flex: 1,
                    width: 350,
                    paddingRight: 20,
                    backgroundColor: 'transparent',
                },
            }}>
            <Drawer.Screen name="MotivationScreen" component={MotivationScreen} />
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );
};

const RootAppNavigator = () => {
    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    return (
        // @ts-ignore
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name="AppRoot">{() => (isUserLoggedIn ? <MainNavigator /> : <AuthNavigator />)}</RootStack.Screen>
            <RootStack.Screen name="ErrorScreen" component={ErrorScreen} />
        </RootStack.Navigator>
    );
};

export default function AppNavigator() {
    return (
        // @ts-ignore
        <NavigationContainer ref={navigationRef}>
            <RootAppNavigator />
        </NavigationContainer>
    );
}
