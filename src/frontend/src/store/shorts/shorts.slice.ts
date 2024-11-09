import { createSlice } from '@reduxjs/toolkit';

export interface IShortsState {
  shorts: any[];
}

const initialState: IShortsState = {
  shorts: [],
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    createShort(state) {
      state.shorts = [];
    },
  },
});

export const { createShort } = layoutSlice.actions;

export default layoutSlice.reducer;
