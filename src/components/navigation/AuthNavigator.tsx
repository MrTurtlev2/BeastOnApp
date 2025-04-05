import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './loginScreen/LoginScreen.tsx';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
