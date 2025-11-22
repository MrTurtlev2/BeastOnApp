import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const Styles = (size: 'small' | 'default' = 'default') => {
    return StyleSheet.create({
        wrapper: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#1E1E1E',
            borderRadius: 30,
            paddingHorizontal: size === 'small' ? 10 : 20,
            paddingVertical: 12,
            marginVertical: 10,
            boxShadow: ` 
            inset 0 2px 4px rgba(0, 0, 0, 0.4),
            inset 0 -3px 4px rgba(46, 46, 46, 1)
        `,
        },
        icon: {
            marginRight: 12,
            position: 'absolute',
            top: -25,
            left: 20,
        },
        input: {
            flex: 1,
            fontSize: 20,
            color: Colors.pink,
            paddingLeft: size === 'small' ? 10 : 50,
            textAlign: size === 'small' ? 'center' : 'left',
        },
    });
};
