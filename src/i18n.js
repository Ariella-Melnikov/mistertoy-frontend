import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "address": "Address",
            "store_hours": "Store Hours",
            "close": "Close",
        }
    },
    he: {
        translation: {
            "address": "כתובת",
            "store_hours": "שעות פתיחה",
            "close": "סגור",
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;