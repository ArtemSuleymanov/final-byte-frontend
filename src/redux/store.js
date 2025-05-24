import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import loaderReducer from './loader/loaderSlice';
import currencyReducer from './currency/currencySlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { transactionsReducer } from './transactions/transactionsSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  authConfig: {
    key: 'auth',
    storage,
    whitelist: ['accessToken', 'isLoggedIn'],
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

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    loader: loaderReducer,
    auth: persistedAuthReducer,
    transactions: transactionsReducer,
    currency: persistedCurrencyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
