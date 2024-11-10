import { createSlice } from '@reduxjs/toolkit';

export interface ILayoutState {
  isCollapsedSide: boolean;
}

const initialState: ILayoutState = {
  isCollapsedSide: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleCollapseSide(state) {
      state.isCollapsedSide = !state.isCollapsedSide;
    },
  },
});

export const { toggleCollapseSide } = layoutSlice.actions;

export default layoutSlice.reducer;
