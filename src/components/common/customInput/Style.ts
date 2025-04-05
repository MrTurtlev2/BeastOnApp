import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/theme.ts';

export const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    input: {
        backgroundColor: `${colors.white}`,
        minWidth: 250,
        borderRadius: 20,
        textAlign: 'center',
        paddingHorizontal: 15,
    },
});
