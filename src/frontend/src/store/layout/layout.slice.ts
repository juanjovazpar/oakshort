import { createSlice } from '@reduxjs/toolkit';

export interface ILayoutState {
  isCollapsedSide: boolean;
  isFloatingBoxVisible: boolean;
}

const initialState: ILayoutState = {
  isCollapsedSide: false,
  isFloatingBoxVisible: true,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleCollapseSide(state) {
      state.isCollapsedSide = !state.isCollapsedSide;
    },
    toggleFloatingBox(state) {
      state.isFloatingBoxVisible = !state.isFloatingBoxVisible;
    },
  },
});

export const { toggleCollapseSide, toggleFloatingBox } = layoutSlice.actions;

export default layoutSlice.reducer;
