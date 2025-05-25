import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions } from './transactionsOperations';

const initialState = {
  items: [
    {
      id: '101',
      date: '22.05.25',
      type: '+',
      category: 'Incomes',
      comment: 'Project for client  ',
      sum: 1500,
    },
    {
      id: '102',
      date: '24.05.25',
      type: '-',
      category: 'Products',
      comment: 'Dinner ',
      sum: 250,
    },
    {
      id: '103',
      date: '25.05.25',
      type: '-',
      category: 'Education',
      comment: 'React handbook',
      sum: 120,
    },
    {
      id: '10',
      date: '24.05.25',
      type: '-',
      category: 'Products',
      comment: 'Dinner ',
      sum: 250,
    },
    {
      id: '1',
      date: '25.05.25',
      type: '-',
      category: 'Education',
      comment: 'React handbook',
      sum: 120,
    },
    {
      id: '2',
      date: '24.05.25',
      type: '-',
      category: 'Products',
      comment: 'Dinner ',
      sum: 250,
    },
    {
      id: '3',
      date: '25.05.25',
      type: '-',
      category: 'Education',
      comment: 'React handbook',
      sum: 120,
    },
    {
      id: '82',
      date: '24.05.25',
      type: '-',
      category: 'Products',
      comment: 'Dinner ',
      sum: 250,
    },
    {
      id: '83',
      date: '25.05.25',
      type: '-',
      category: 'Education',
      comment: 'React handbook',
      sum: 120,
    },
    {
      id: '92',
      date: '24.05.25',
      type: '-',
      category: 'Products',
      comment: 'Dinner ',
      sum: 250,
    },
    {
      id: '13',
      date: '25.05.25',
      type: '-',
      category: 'Education',
      comment: 'React handbook',
      sum: 120,
    },
    {
      id: '12',
      date: '24.05.25',
      type: '-',
      category: 'Products',
      comment: 'Dinner ',
      sum: 250,
    },
    {
      id: '19',
      date: '25.05.25',
      type: '-',
      category: 'Education',
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

export const transactionsReducer = transactionsSlice.reducer;
