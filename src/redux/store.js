import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loader/loaderSlice';

const dummyReducer = (state = {}, action) => state;

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    loader: loaderReducer,
  },
});
