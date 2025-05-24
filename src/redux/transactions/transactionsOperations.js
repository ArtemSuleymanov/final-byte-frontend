import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://final-byte-backend.onrender.com',
});

export const fetchTransactions = createAsyncThunk('transactions/fetchAll', async (data, thunkAPI) => {
  try {
    const response = await api.get('/transactions');
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});
