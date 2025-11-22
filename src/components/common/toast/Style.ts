import {StyleSheet} from 'react-native';
import {Fonts} from '../../../constants/Fonts';
import {Colors} from '../../../constants/Colors';

export const TOAST_CONFIG = {
    error: {
        icon: 'xmark',
        title: 'ERROR',
        mainColor: '#E03F52',
        secondaryColor: Colors.bgGrey,
    },
    success: {
        icon: 'check',
        title: 'SUKCES',
        mainColor: '#4CAF50',
        secondaryColor: Colors.bgGrey,
    },
    info: {
        icon: 'info',
        title: 'INFO',
        mainColor: '#654CD2',
        secondaryColor: Colors.bgGrey,
    },
};

export const customToastStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '96%',
        minHeight: 80,
        position: 'relative',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 24,
        overflow: 'hidden',
    },

    contentWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
    },

    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },

    textContainer: {
        flex: 1,
        paddingVertical: 10,
    },
    title: {
        fontSize: 24,
        color: Colors.white,
        fontFamily: Fonts.Marker,
    },
    message: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.regular,
        marginTop: 2,
    },
});
