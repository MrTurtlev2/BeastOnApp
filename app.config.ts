import {ConfigContext, ExpoConfig} from '@expo/config';

export default ({config}: ConfigContext): ExpoConfig => {
    return {
        ...config,
        plugins: [
            [
                'expo-font',
                {
                    fonts: [
                        './src/assets/fonts/Lato-Bold.ttf',
                        './src/assets/fonts/Lato-Light.ttf',
                        './src/assets/fonts/Lato-Regular.ttf',
                        './src/assets/fonts/PermanentMarker-Regular.ttf',
                    ],
                },
            ],
        ],
    } as ExpoConfig;
};
