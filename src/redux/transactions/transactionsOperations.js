import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader } from '../auth/authOperations';
import { refreshSessionThunk } from '../auth/authOperations';
import axiosInstance from '../../api/axios';

export const getTransactions = createAsyncThunk('transactions/getAll', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    if (token) setAuthHeader(token);
    const { data } = await axiosInstance.get('/transactions');

    console.log('Fetched transactions:', data);

    // ✔️ Extract the actual array of transactions
    const transactions = data?.data?.data || [];

    return transactions;
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
    await thunkAPI.dispatch(refreshSessionThunk());

    // log & return single transaction
    console.log('Result from addTransaction:', data.data);
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
      await thunkAPI.dispatch(refreshSessionThunk());

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
    await thunkAPI.dispatch(refreshSessionThunk());

    // await thunkAPI.dispatch(userData());
    return { id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
