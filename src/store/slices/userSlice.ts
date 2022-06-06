import { RootState } from '@/store';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { User } from '@/types';

export const initialState: {
  user: User | undefined;
} = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = undefined;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const getUser = createSelector(
  (state: RootState) => state.user,
  (user) => user.user
);

export default userSlice.reducer;
