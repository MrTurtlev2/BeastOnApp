/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import MainNavigator from './components/navigation/MainNavigator.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <MainNavigator/>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
