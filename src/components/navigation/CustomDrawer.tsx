import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

export default function CustomDrawer(props: any) {
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{uri: 'https://via.placeholder.com/80'}}
                    style={styles.avatar}
                />
                <Text style={styles.username}>Jan Kowalski</Text>
            </View>
            <DrawerItemList {...props} />
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Wyloguj</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1},
    header: {alignItems: 'center', padding: 20, backgroundColor: '#6200ea'},
    avatar: {width: 80, height: 80, borderRadius: 40, marginBottom: 10},
    username: {color: 'white', fontSize: 18, fontWeight: 'bold'},
    logoutButton: {
        marginTop: 20,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#d32f2f',
    },
    logoutText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});
