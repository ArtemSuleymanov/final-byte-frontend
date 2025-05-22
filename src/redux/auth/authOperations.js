import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_BASE_URL = 'https://final-byte-backend.onrender.com';

axios.defaults.baseURL = VITE_API_BASE_URL;

export const registerThunk = createAsyncThunk('auth/register', async (body, thunkAPI) => {
  try {
    const { data } = await axios.post('auth/register', body);
    console.log(data);
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
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});