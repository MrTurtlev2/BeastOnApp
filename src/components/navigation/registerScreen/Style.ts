import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center',
    },
    emailInput: {
        marginBottom: 20,
    },
    passwordInput: {
        marginBottom: 20,
    },
    repeatPasswordInput: {
        marginBottom: 40,
    },
    validatorCard: {
        backgroundColor: 'rgba(24, 24, 26, 0.7)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.07)',
        padding: 16,
        marginBottom: 50,
        width: '100%',
    },
    clawMarkValidation: {
        width: 120,
        height: 120,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.3,
    },
});
