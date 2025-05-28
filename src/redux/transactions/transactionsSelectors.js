export const selectTransactions = (state) => state.transactions?.items || [];
export const selectPagination = (state) => state.transactions.pageInfo;

export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectError = (state) => state.transactions.error;
