const {withDangerousMod, withAndroidStyles} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = (config, color = '@android:color/transparent') => {
    config = withAndroidStyles(config, config => {
        config.modResults = appendAutofillStyle(config.modResults, color);
        return config;
    });

    config = withDangerousMod(config, [
        'android',
        async config => {
            const drawablePath = path.join(config.modRequest.platformProjectRoot, 'app/src/main/res/drawable/autofill_highlight.xml');

            const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="${color}" />
</shape>`;

            if (!fs.existsSync(path.dirname(drawablePath))) {
                fs.mkdirSync(path.dirname(drawablePath), {recursive: true});
            }
            fs.writeFileSync(drawablePath, xmlContent);
            return config;
        },
    ]);

    return config;
};

function appendAutofillStyle(styles, color) {
    if (!styles.resources || !styles.resources.style) return styles;

    const appTheme = styles.resources.style.find(s => s.$.name === 'AppTheme');
    if (appTheme) {
        if (!appTheme.item) {
            appTheme.item = [];
        }

        const hasStyle = appTheme.item.some(i => i.$.name === 'android:autofilledHighlight');
        if (!hasStyle) {
            appTheme.item.push({
                $: {name: 'android:autofilledHighlight'},
                _: '@drawable/autofill_highlight',
            });
        }
    }
    return styles;
}
