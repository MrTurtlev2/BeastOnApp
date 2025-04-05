import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './homeScreen/HomeScreen.tsx';
import CustomDrawer from './CustomDrawer.tsx';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
}
