import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import moviesSlices from './slices/moviesSlices';

export * from './hooks';

const store = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
