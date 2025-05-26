import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../api/axios';

// const VITE_API_BASE_URL = 'https://final-byte-backend.onrender.com';

// axios.defaults.baseURL = VITE_API_BASE_URL;

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
      user: userRes.data,
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
    return thunkAPI.rejectWithValue(error.message);
  }
});
