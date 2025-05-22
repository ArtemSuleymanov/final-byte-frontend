import { createSlice } from '@reduxjs/toolkit';

import { loginThunk, logoutThunk, refreshSessionThunk, registerThunk } from './authOperations';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  accessToken: '',
  isLoggedIn: false,
  isRefreshing: false,
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
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = { name: '', email: '' };
        state.accessToken = '';
        state.isLoggedIn = false;
      })
      .addCase(refreshSessionThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshSessionThunk.fulfilled, (state, action) => {
        state.user = action.payload.user ?? {};
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshSessionThunk.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
