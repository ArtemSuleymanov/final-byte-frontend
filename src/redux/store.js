import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import loaderReducer from './loader/loaderSlice';
import currencyReducer from './currency/currencySlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { transactionsReducer } from './transactions/transactionsSlice';
import toggleReducer from './toggle/toggleSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  authConfig: {
    key: 'auth',
    storage,
    whitelist: ['accessToken', 'isLoggedIn', 'user'],
  },
  currencyConfig: {
    key: 'currency',
    storage,
    whitelist: ['data', 'lastFetched'],
  },
};

const persistedAuthReducer = persistReducer(persistConfig.authConfig, authReducer);
const persistedCurrencyReducer = persistReducer(persistConfig.currencyConfig, currencyReducer);

const dummyReducer = (state = {}, action) => state;

const transactionsPersistConfig = {
  key: 'transactions',
  storage,
};

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    loader: loaderReducer,
    auth: persistedAuthReducer,
    transactions: persistReducer(transactionsPersistConfig, transactionsReducer),
    currency: persistedCurrencyReducer,
    toggle: toggleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
