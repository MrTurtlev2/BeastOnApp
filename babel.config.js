module.exports = {
    presets: ['module:@react-native/babel-preset'],
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
