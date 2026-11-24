import {StyleSheet} from 'react-native';
import {Fonts} from '../../../../../constants/Fonts';
import {Colors} from '../../../../../constants/Colors';

export const style = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    cardsWrapper: {
        width: '100%',
        gap: 18,
    },
    card: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#5A1926',
        borderWidth: 1.5,
        borderColor: '#8E293D',
        borderRadius: 18,
        paddingVertical: 20,
        paddingHorizontal: 18,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 6,
    },
    iconBadge: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#B33951',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    plusIcon: {
        fontSize: 34,
        lineHeight: 36,
        fontFamily: `${Fonts.regular}`,
        color: Colors.white,
    },
    cardTextContainer: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: `${Fonts.bold}`,
        color: Colors.white,
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 15,
        lineHeight: 20,
        fontFamily: `${Fonts.regular}`,
        color: '#D8B4BC',
    },
    chevron: {
        fontSize: 28,
        lineHeight: 28,
        fontFamily: `${Fonts.bold}`,
        color: Colors.pink,
    },
});
