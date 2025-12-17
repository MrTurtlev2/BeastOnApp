import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BlurView} from 'expo-blur';
import {useNavigation} from '@react-navigation/native';

const CustomModalScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <BlurView intensity={50} tint="dark" experimentalBlurMethod="dither" style={StyleSheet.absoluteFill} />
            <View style={styles.modalContent}>
                <Text style={styles.title}>PYTANKO...?</Text>
                <Text style={styles.subtitle}>Czy na pewno chcesz zapisać ten trening?</Text>
                <View style={styles.buttonRow}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={{color: 'red', fontSize: 20}}>X</Text>
                    </Pressable>
                    <Pressable>
                        <Text>ZAPISZ</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'rgba(50, 50, 50, 0.8)',
        padding: 30,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        fontStyle: 'italic',
    },
    subtitle: {
        color: 'white',
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
});

export default CustomModalScreen;
