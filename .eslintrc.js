module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        'react-native/no-inline-styles': 0,
        'prettier/prettier': 0,
        curly: 'off',
        'max-len': ['warn', { code: 140 }],
    },
};
