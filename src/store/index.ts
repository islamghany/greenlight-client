import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import moviesSlices from './slices/moviesSlices';
import { emptySplitApi } from './emptyApi';

export * from './hooks';

const store = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlices,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
