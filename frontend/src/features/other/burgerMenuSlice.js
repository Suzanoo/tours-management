import { createSlice } from '@reduxjs/toolkit';

const burgerMenuSlice = createSlice({
  name: 'burgerMenu',
  initialState: {
    isExpanded: false,
  },
  reducers: {
    expandMenu: (state) => {
      state.isExpanded = true;
    },
    collapseMenu: (state) => {
      state.isExpanded = false;
    },
  },
});

export const { expandMenu, collapseMenu } = burgerMenuSlice.actions;

export default burgerMenuSlice.reducer;
