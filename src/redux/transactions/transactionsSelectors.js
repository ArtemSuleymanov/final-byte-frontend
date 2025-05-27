import { createSelector } from '@reduxjs/toolkit';

export const selectTransactions = (state) => state.transactions?.items || [];
export const selectPagination = createSelector(
  (state) => state.transactions.pageInfo,
  (pageInfo) => pageInfo
);
// export const selectTransactions = (state) => state.transactions.items || [];
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectError = (state) => state.transactions.error;
