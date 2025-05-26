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
  },
});

export const { toggleChecked, setChecked } = toggleSlice.actions;
export default toggleSlice.reducer;
