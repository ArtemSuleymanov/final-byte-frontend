import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrencyIfNeeded } from './currencyOperations';

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
