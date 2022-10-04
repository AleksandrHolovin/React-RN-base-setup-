import React, { useEffect } from 'react';

import { Platform, StatusBar, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from "react-native-flash-message";


import App from './App';
import { store, persistor } from './src/redux';


const AppContainer: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaView style={{ backgroundColor: theme.global.background }} />
                {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
                <FlashMessage position="top" />
                <App />
            </PersistGate>
        </Provider>
    );
};

export default AppContainer;

