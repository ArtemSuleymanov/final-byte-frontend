import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { currencyApi } from '../../api/currencyApi';
import { currencyCodeConversion } from '../../utils/helpers';

const HOUR_MS = 60 * 60 * 1000;

export const fetchCurrencyIfNeeded = createAsyncThunk('currency/fetchIfNeeded', async (_, { getState, dispatch }) => {
  const { lastFetched } = getState().currency;
  const now = Date.now();

  if (lastFetched && now - lastFetched < HOUR_MS) {
    return null;
  }

  const response = await axiosInstance.get(currencyApi);
  const data = currencyCodeConversion(response.data);
  return { data, timestamp: now };
});

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyIfNeeded.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyIfNeeded.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload.data;
          state.lastFetched = action.payload.timestamp;
        }
        state.loading = false;
      })
      .addCase(fetchCurrencyIfNeeded.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default currencySlice.reducer;
