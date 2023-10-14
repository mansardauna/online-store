// index.js or index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import 'slick-carousel/slick/slick.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import './index.css';
import App from './App';
import './i18n'; 
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { DarkModeProvider } from './components/ui/components/DarkMode';
import { AppWrapper } from './AppWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DarkModeProvider>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <I18nextProvider i18n={i18n}>
  <AppWrapper />
</I18nextProvider>
    </PersistGate>
  </Provider>
  </DarkModeProvider>
);
