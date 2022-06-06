import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
export * from './hooks';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
