import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactions } from '../../api/transactionApi';

export const fetchTransactions = createAsyncThunk('transactions/fetchAll', async (_, thunkAPI) => {
  try {
    const { data } = await getTransactions();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
