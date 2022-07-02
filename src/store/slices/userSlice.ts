import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { ApiStatus, User, CreateUser } from '@/types';
import api from '@/api';

export const initialState: {
  user: User | undefined;
  fetchUserStatus: ApiStatus;
  userError: string | null;
} = {
  user: undefined,
  fetchUserStatus: 'IDLE',
  userError: null,
};

export const fetchCurrentUser = createAsyncThunk('users/getCurrentUser', () =>
  api.usersApi.getCurrentUser().then((res) => res.data.user)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state, _) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state, action) => {
      state.fetchUserStatus = 'PENDING';
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.fetchUserStatus = 'SUCCESS';

      state.user = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.fetchUserStatus = 'ERROR';
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
