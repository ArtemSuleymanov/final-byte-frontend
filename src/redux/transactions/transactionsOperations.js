import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://final-byte-backend.onrender.com',
});

export const getTransactions = createAsyncThunk('transactions/getAll', async ({ signal }, thunkAPI) => {
  try {
    const { data } = await api.get('/transactions', { signal });

    return data.transactions;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTransaction = createAsyncThunk('transactions/addTransaction', async (body, thunkAPI) => {
  try {
    const { data } = await api.post('/transactions', body);
    await thunkAPI.dispatch(userData());

    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ id, ...body }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/transactions/${id}`, body);

      await thunkAPI.dispatch(userData());

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async ({ id }, thunkAPI) => {
  try {
    await api.delete(`transactions/${id}`);

    await thunkAPI.dispatch(userData());
    return { id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
