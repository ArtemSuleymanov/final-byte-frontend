import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions } from './transactionsOperations';

const initialState = {
  items: [
    {
      id: '101',
      date: '2025-05-21',
      type: '+',
      category: 'Freelance',
      comment: 'Project for client',
      sum: 1500,
    },
    {
      id: '102',
      date: '2025-05-20',
      type: '-',
      category: 'Car',
      comment: 'Dinner ',
      sum: 250,
    },
    {
      id: '103',
      date: '2025-05-19',
      type: '-',
      category: 'Books',
      comment: 'React handbook',
      sum: 120,
    },
  ],
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
