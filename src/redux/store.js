import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';

const dummyReducer = (state = {}, action) => state;

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    auth: authReducer,
  },
});
