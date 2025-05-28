import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutThunk, setAuthHeader } from '../auth/authOperations';
import { refreshSessionThunk } from '../auth/authOperations';
import axiosInstance from '../../api/axios';

export const getTransactions = createAsyncThunk('transactions/getAll', async (page = 1, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    if (token) setAuthHeader(token);

    const { data } = await axiosInstance.get(`/transactions?page=${page}&sortBy=date&sortOrder=desc`);
    const transactions = data?.data?.data || [];

    return {
      transactions,
      page: data?.data?.page || 1,
      perPage: data?.data?.perPage || 10,
      totalItems: data?.data?.totalItems || 0,
      totalPages: data?.data?.totalPages || 1,
      hasNextPage: data?.data?.hasNextPage || false,
    };
  } catch (error) {
    if (error.response?.status === 401 || error.response?.data?.message?.includes('Access token expired')) {
      thunkAPI.dispatch(logoutThunk());
      return thunkAPI.rejectWithValue('Session expired, logged out');
    }
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

    return data.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.data?.message?.includes('Access token expired')) {
      thunkAPI.dispatch(logoutThunk());
      return thunkAPI.rejectWithValue('Session expired, logged out');
    }
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
      return data.data;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.data?.message?.includes('Access token expired')) {
        thunkAPI.dispatch(logoutThunk());
        return thunkAPI.rejectWithValue('Session expired, logged out');
      }
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
    return { id };
  } catch (error) {
    if (error.response?.status === 401 || error.response?.data?.message?.includes('Access token expired')) {
      thunkAPI.dispatch(logoutThunk());
      return thunkAPI.rejectWithValue('Session expired, logged out');
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});
