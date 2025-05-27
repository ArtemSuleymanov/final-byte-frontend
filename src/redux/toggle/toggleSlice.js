import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    checked: false,
  },
  reducers: {
    toggleChecked: (state) => {
      state.checked = !state.checked;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    toggleReset: (state) => {
      state.checked = false;
    },
  },
});

export const { toggleChecked, setChecked, toggleReset } = toggleSlice.actions;
export default toggleSlice.reducer;
