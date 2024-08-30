import { createSlice } from '@reduxjs/toolkit';

export interface ILayoutState {
  isCollapsed: boolean;
  isCollapsedSide: boolean;
  isFloatingBoxVisible: boolean;
}

const initialState: ILayoutState = {
  isCollapsed: true,
  isCollapsedSide: false,
  isFloatingBoxVisible: false,
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
    toggleFloatingBox(state) {
      state.isFloatingBoxVisible = !state.isFloatingBoxVisible;
    },
  },
});

export const { toggleCollapse, toggleCollapseSide, toggleFloatingBox } =
  layoutSlice.actions;

export default layoutSlice.reducer;
