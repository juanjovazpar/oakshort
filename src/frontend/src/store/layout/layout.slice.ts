import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILayoutState {
  isCollapsedSide: boolean;
  recentlyCreatedShort: any; // TODO: Add interface here
}

const initialState: ILayoutState = {
  isCollapsedSide: false,
  recentlyCreatedShort: undefined,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleCollapseSide(state) {
      state.isCollapsedSide = !state.isCollapsedSide;
    },
    setRecentlyCreatedShort(state, action: PayloadAction<any>) {
      // TODO: Add interface here
      state.recentlyCreatedShort = action.payload;
    },
  },
});

export const { toggleCollapseSide, setRecentlyCreatedShort } =
  layoutSlice.actions;

export default layoutSlice.reducer;
