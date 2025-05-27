import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

export const setAuthHeader = (token) => {
  const cleanToken = token.replace(/^"|"$/g, '');
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${cleanToken}`;
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

export const registerThunk = createAsyncThunk('auth/register', async (body, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/register', body);
    return { registered: true };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginThunk = createAsyncThunk('auth/login', async (body, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/auth/login', body);
    console.log('Login response:', res.data);
    const accessToken = res.data?.data?.accessToken.replace(/"/g, '');

    if (!accessToken) throw new Error('No access token returned from login');

    setAuthHeader(accessToken);

    const userRes = await axiosInstance.get('/users/current');

    return {
      accessToken,
      user: userRes.data.user,
    };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshSessionThunk = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;

    if (!persistedToken) return thunkAPI.rejectWithValue('No token found');

    setAuthHeader(persistedToken);

    const { data } = await axiosInstance.get('/users/current');
    return { user: data };
  } catch (error) {
    if (error.response?.status === 401 && error.response?.data?.message?.includes('Access token expired')) {
      thunkAPI.dispatch(logoutThunk());
      return thunkAPI.rejectWithValue('Session expired, logged out');
    }

    return thunkAPI.rejectWithValue(error.message);
  }
});
