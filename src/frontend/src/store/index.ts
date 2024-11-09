import { configureStore } from '@reduxjs/toolkit';
import layout, { ILayoutState } from './layout/layout.slice';
import shorts, { IShortsState } from './shorts/shorts.slice';

export interface IStore {
  layout: ILayoutState;
  shorts: IShortsState;
}

const store = configureStore({
  reducer: {
    layout,
    shorts,
  },
});

export default store;
