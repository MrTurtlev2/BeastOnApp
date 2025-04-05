import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/theme';

export const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${colors.white}`,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    btnText: {
        fontSize: 16,
    },
});
