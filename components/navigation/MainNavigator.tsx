import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen/HomeScreen.tsx';
import CustomDrawer from './CustomDrawer.tsx';

export type RootDrawerParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerType: 'slide',
                }}
            >
                <Drawer.Screen name="Home" component={HomeScreen}/>
                {/*<Drawer.Screen name="Profile" component={ProfileScreen}/>*/}
                {/*<Drawer.Screen name="Settings" component={SettingsScreen}/>*/}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
