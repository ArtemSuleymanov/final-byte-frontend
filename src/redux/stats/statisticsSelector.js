export const selectStatistics = (state) => state.stats;
export const selectCategorySummary = (state) => state.stats.categorySummary;
export const selectTotals = (state) => state.stats.totals;
export const selectIsLoading = (state) => state.stats.isLoading;
export const selectError = (state) => state.stats.error;