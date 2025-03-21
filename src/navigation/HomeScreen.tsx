import React from 'react';
import {Button, Text, View} from 'react-native';

export default function HomeScreen({navigation}: any) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Strona Główna</Text>
            <Button
                title="Otwórz menu"
                onPress={() => navigation.openDrawer()}
            />
        </View>
    );
}
