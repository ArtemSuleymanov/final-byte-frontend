import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { currencyApi } from '../../api/currencyApi';
import { currencyCodeConversion } from '../../utils/helpers';

const HOUR_MS = 60 * 60 * 1000;

export const fetchCurrencyIfNeeded = createAsyncThunk('currency/fetchIfNeeded', async (_, { getState }) => {
  const { lastFetched } = getState().currency;
  const now = Date.now();

  if (lastFetched && now - lastFetched < HOUR_MS) {
    return null;
  }

  const response = await axiosInstance.get(currencyApi);
  const data = currencyCodeConversion(response.data);
  return { data, timestamp: now };
});
