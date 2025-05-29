import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import loaderReducer from './loader/loaderSlice';
import loadingMiddleware from './loader/loadingMiddleware';
import currencyReducer from './currency/currencySlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { transactionsReducer } from './transactions/transactionsSlice';
import storage from 'redux-persist/lib/storage';
import { statisticReducer } from './stats/statisticsSlice';

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
  statsPersistConfig: {
    key: 'stats',
    storage,
    whitelist: ['categorySummary', 'totals'] 
  },

};

const persistedAuthReducer = persistReducer(persistConfig.authConfig, authReducer);
const persistedCurrencyReducer = persistReducer(persistConfig.currencyConfig, currencyReducer);
const persistedStatsReducer = persistReducer(persistConfig.statsPersistConfig,statisticReducer )
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
    stats: persistedStatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loadingMiddleware),
});

export const persistor = persistStore(store);
