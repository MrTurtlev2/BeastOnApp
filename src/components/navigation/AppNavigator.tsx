import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './homeScreen/HomeScreen';
import CustomDrawer from './CustomDrawer';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './registerScreen/RegisterScreen';
import MotivationScreen from './motivationScreen/MotivationScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        // @ts-ignore
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/*<Stack.Screen name="Login" component={LoginScreen} />*/}
            <Stack.Screen name="Login" component={MotivationScreen} />
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
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );
};

export default function AppNavigator() {
    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    return <NavigationContainer>{isUserLoggedIn ? <MainNavigator /> : <AuthNavigator />}</NavigationContainer>;
}
