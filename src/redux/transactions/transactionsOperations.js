import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader } from '../auth/authOperations';
import axiosInstance from '../../api/axios';

export const getTransactions = createAsyncThunk('transactions/getAll', async (body, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    if (token) setAuthHeader(token);
    const { data } = await axiosInstance.get('/transactions', body);

    return data.transactions;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTransaction = createAsyncThunk('transactions/addTransaction', async (body, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    if (token) setAuthHeader(token);
    const { data } = await axiosInstance.post('/transactions', body);
    // await thunkAPI.dispatch(userData());

    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ id, ...body }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;

      if (token) setAuthHeader(token);
      const { data } = await axiosInstance.patch(`/transactions/${id}`, body);

      // await thunkAPI.dispatch(userData());

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async ({ id }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    if (token) setAuthHeader(token);
    await axiosInstance.delete(`transactions/${id}`);

    // await thunkAPI.dispatch(userData());
    return { id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
