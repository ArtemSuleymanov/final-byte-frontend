import { createSlice } from '@reduxjs/toolkit';
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from './transactionsOperations';

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

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: 'transactions',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getTransactions.pending, handlePending)
      .addCase(getTransactions.rejected, handleRejected)

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        state.items.splice(index, 1, action.payload);
      })
      .addCase(updateTransaction.pending, handlePending)
      .addCase(updateTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        if (!payload?.id) return;
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter((item) => item.id !== payload.id);
      })
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.rejected, handleRejected);
  },
});

export const transactionsReducer = slice.reducer;
