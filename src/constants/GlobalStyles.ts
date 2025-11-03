import {ViewStyle} from 'react-native';

export const barShadow: ViewStyle = {
    boxShadow: [
        {
            offsetX: -3,
            offsetY: -3,
            blurRadius: 4,
            color: 'rgba(255, 255, 255, 0.05)',
        },
        {
            offsetX: 3,
            offsetY: 3,
            blurRadius: 6,
            color: 'rgba(0, 0, 0, 0.5)',
        },
    ],
};
export const simpleShadow: ViewStyle = {
    boxShadow: [
        {
            offsetX: 0,
            offsetY: 5,
            blurRadius: 6,
            color: 'rgba(0, 0, 0, 0.6)',
        },
    ],
};
