import { configureStore } from '@reduxjs/toolkit';
import layout, { ILayoutState } from './layout/layout.slice';

export interface IStore {
  layout: ILayoutState;
}

const store = configureStore({
  reducer: {
    layout,
  },
});

export default store;
