import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'isLoggedIn'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const dummyReducer = (state = {}, action) => state;

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
