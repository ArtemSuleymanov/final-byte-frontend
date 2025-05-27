import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, refreshSessionThunk, registerThunk } from './authOperations';

const initialState = {
  user: {
    name: '',
    email: '',
    balance: '',
  },
  accessToken: '',
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.payload || 'Registration failed';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user ?? {};
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = { name: '', email: '', balance: '' };
        state.accessToken = '';
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshSessionThunk.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshSessionThunk.fulfilled, (state, action) => {
        state.user = action.payload.user ?? {};
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshSessionThunk.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload || 'Session refresh failed';
      });
  },
});

export const authReducer = slice.reducer;
