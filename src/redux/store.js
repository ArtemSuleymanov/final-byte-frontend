import { configureStore } from '@reduxjs/toolkit';

const dummyReducer = (state = {}, action) => state;

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
});
