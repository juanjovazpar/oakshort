import { createSlice } from '@reduxjs/toolkit';

export interface ILayoutState {
  isCollapsed: boolean;
  isCollapsedSide: boolean;
}

const initialState: ILayoutState = {
  isCollapsed: true,
  isCollapsedSide: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleCollapse(state) {
      state.isCollapsed = !state.isCollapsed;
      if (state.isCollapsed) state.isCollapsedSide = false;
    },
    toggleCollapseSide(state) {
      state.isCollapsedSide = !state.isCollapsedSide;
    },
  },
});

export const { toggleCollapse, toggleCollapseSide } = layoutSlice.actions;

export default layoutSlice.reducer;
