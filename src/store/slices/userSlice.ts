import { AuthenticateUser } from './../../types/generatedClient/api';
import { RootState } from '@/store';
import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { ApiStatus, User } from '@/types';
import api from '@/api';

export const initialState: {
  user: User | undefined;
  fetchUserStatus: ApiStatus;
} = {
  user: undefined,
  fetchUserStatus: 'IDLE',
};

export const fetchCurrentUser = createAsyncThunk('users/getCurrentUser', () =>
  api.usersApi.getCurrentUser().then((res) => res.data.user)
);

export const signInUser = createAsyncThunk(
  'users/signin',
  (user: AuthenticateUser) =>
    api.tokensApi.signinUser(user).then((res) => res.data)
);
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
    builder.addCase(signInUser.pending, (state, action) => {
      state.fetchUserStatus = 'PENDING';
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.fetchUserStatus = 'SUCCESS';
      state.user = action.payload;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.fetchUserStatus = 'ERROR';
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const getUser = createSelector(
  (state: RootState) => state.user,
  (user) => user.user
);

export default userSlice.reducer;
