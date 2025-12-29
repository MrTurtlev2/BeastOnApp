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
import {Colors} from '../../constants/Colors';
import AddPlanScreen from './addPlanScreen/AddPlanScreen';
import CustomModalScreen from './customModalScreen/CustomModalScreen';
import ExerciseScreen from './exerciseScreen/ExerciseScreen';

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

const defaultTheme = {
    colors: {
        background: Colors.bgGrey,
    },
};

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{headerShown: false}} />
            <HomeStack.Screen name="AddPlanScreen" component={AddPlanScreen} />
            <HomeStack.Screen name="ExerciseScreen" component={ExerciseScreen} />
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
            <RootStack.Screen
                name="CustomModalScreen"
                component={CustomModalScreen}
                options={{
                    headerShown: false,
                    animation: 'fade',
                    presentation: 'transparentModal',
                    contentStyle: {backgroundColor: 'transparent'},
                }}
            />
        </RootStack.Navigator>
    );
};

export default function AppNavigator() {
    return (
        <NavigationContainer ref={navigationRef} theme={defaultTheme}>
            <RootAppNavigator />
        </NavigationContainer>
    );
}
