import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginVertical: 10,

        boxShadow: [
            {
                color: '#2A2A2A',
                // @ts-ignore
                offset: {width: 6, height: 6},
                radius: 10,
                opacity: 1,
            },
            {
                color: '#3A3A3A',
                offset: {width: -6, height: -6},
                radius: 10,
                opacity: 1,
            },
        ],
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#E0E0E0',
    },
});
