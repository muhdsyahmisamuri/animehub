import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import detailReducer from './slices/detailSlice';
import homeReducer from './slices/homeSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    detail: detailReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
