module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        [
            'module-resolver',
            {
                extensions: ['.tsx', 'jsx', '.ts', '.js', '.json'],
            },
        ],
        'react-native-reanimated/plugin',
    ],
};
