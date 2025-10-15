import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {Fonts} from '../../../constants/Fonts';

export const styles = StyleSheet.create({
    motivationText: {
        color: Colors.dirtyWhite,
        fontFamily: Fonts.light,
        fontSize: 24,
        lineHeight: 26,
        marginTop: 40,
    },
    logoWrapper: {
        position: 'absolute',
        top: 230,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        paddingBottom: 80,
    },
});
