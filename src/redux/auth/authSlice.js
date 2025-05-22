import { createSlice } from '@reduxjs/toolkit';

import { loginThunk, registerThunk } from './authOperations';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  accessToken: '',
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.data ?? {};
        state.accessToken = '';
        state.isLoggedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user ?? {};
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
      });
  },
});

export const authReducer = slice.reducer;
