import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_BASE_URL = 'https://final-byte-backend.onrender.com';

axios.defaults.baseURL = VITE_API_BASE_URL;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const registerThunk = createAsyncThunk('auth/register', async (body, thunkAPI) => {
  try {
    const { data } = await axios.post('auth/register', body);
    console.log(data);
    setAuthHeader(data.accessToken);
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginThunk = createAsyncThunk('auth/login', async (body, thunkAPI) => {
  try {
    const { data } = await axios.post('auth/login', body);
    setAuthHeader(data.accessToken);
    localStorage.setItem('accessToken', data.accessToken);
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshSessionThunk = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    const { data } = await axios.get('users/current');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
