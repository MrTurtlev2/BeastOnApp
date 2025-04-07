import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './homeScreen/HomeScreen.tsx';
import CustomDrawer from './CustomDrawer.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import LoginScreen from './loginScreen/LoginScreen.tsx';
import {createStackNavigator} from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/*<Stack.Screen name="ErrorScreen" component={ErrorScreen} />*/}
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
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
                overlayColor: 'transparent',
                drawerStyle: {
                    flex: 1,
                    // width: '90%',
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
