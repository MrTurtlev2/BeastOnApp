import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootDrawerParamList} from '../MainNavigator.tsx';

type Props = {
    navigation: DrawerNavigationProp<RootDrawerParamList, 'Home'>;
};

export default function HomeScreen({navigation}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>🏠 Strona Główna</Text>
            <Text style={styles.text}>🏠 Strona Główna</Text>
            <Text style={styles.text}>🏠 Strona Główna</Text>
            <Text style={styles.text}>🏠 Strona Główna</Text>
            <Text style={styles.text}>🏠 Strona Główna</Text>
            <Button title="Otwórz menu" onPress={() => navigation.openDrawer()}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text: {fontSize: 18},
});
