import {initReactI18next} from 'react-i18next';
import en from './en.json';
import pl from './pl.json';
import i18n from 'i18next';

const resources = {
    en: {translation: en},
    pl: {translation: pl},
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'pl',
    fallbackLng: 'en',
});

export default i18n;
