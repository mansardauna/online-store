import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Load translations using the HTTP backend
  .use(initReactI18next) // Initialize react-i18next
  .init({
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback language
    backend: {
      loadPath: '/Translation/{{lng}}/layout.json',

    },
    interpolation: {
      escapeValue: false, // React already escapes values, so no need to escape again
    },
    react: {
      useSuspense: false, // Disable suspense mode (use only if you encounter issues)
    },
  });

export default i18n;
