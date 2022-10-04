import { configureStore, Store } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    Persistor,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers/root.reducer';
import rootSaga from './sagas/root.saga';

type CreateStore = {
    store: Store;
    persistor: Persistor;
};

const persistConfig = {
    key: 'persist',
    storage: AsyncStorage,
    whitelist: ['session', 'codeEditor'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStore = (): CreateStore => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware => [
            sagaMiddleware,
            ...getDefaultMiddleware({
                thunk: false,
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
        ],
    });

    sagaMiddleware.run(rootSaga);

    const persistor = persistStore(store);

    return {
        store,
        persistor,
    };
};

export default createStore;
