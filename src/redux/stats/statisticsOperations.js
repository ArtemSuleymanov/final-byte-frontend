import axiosInstance from '../../api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader } from '../auth/authOperations';

export const getTransactionsStatistic = createAsyncThunk('transactions/getStats', async (yearMonth, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;
    if (token) setAuthHeader(token);

    const { data } = await axiosInstance.get(`/transactions/summary/${yearMonth}`);
    // console.log(data);

    return {
      categorySummary: data.categorySummary,
      totals: data.totals,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
