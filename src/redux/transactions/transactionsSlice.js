import { createSlice } from '@reduxjs/toolkit';
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from './transactionsOperations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: 'transactions',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        const list = Array.isArray(action.payload) ? action.payload : [];
        state.items = list.map((t) => ({
          ...t,
          id: t._id,
        }));
        state.isLoading = false;
      })

      .addCase(getTransactions.pending, handlePending)
      .addCase(getTransactions.rejected, handleRejected)

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          const transaction = {
            ...action.payload,
            id: action.payload._id,
          };
          state.items.unshift(transaction);
        } else {
          console.warn('No payload returned in addTransaction');
        }
      })

      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = { ...action.payload, id: action.payload._id };
        const index = state.items.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.items.splice(index, 1, updated);
        }
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
