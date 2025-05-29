import { createSlice } from "@reduxjs/toolkit";
import { getTransactionsStatistic } from "./statisticsOperations";

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
    name: "stats",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getTransactionsStatistic.pending, handlePending)
        .addCase(getTransactionsStatistic.rejected, handleRejected)
        .addCase(getTransactionsStatistic.fulfilled, (state, action) => {
          state.categorySummary = action.payload?.categorySummary || { 
            expense: {}, 
            income: {} 
          };
          state.totals = action.payload?.totals || { 
            income: 0, 
            expense: 0 
          };
          state.isLoading = false;
        })
    }
})

export const statisticReducer = slice.reducer;