import { objectErrorNorm } from './../../helpers/normliziations';
import { AuthenticateUser } from './../../types/generatedClient/api';
import { RootState } from '@/store';
import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { ApiStatus, User, CreateUser } from '@/types';
import api from '@/api';
import { errorNorm } from '@/helpers';

export const initialState: {
  user: User | undefined;
  fetchUserStatus: ApiStatus;
  userError: string | null;
  registerUserError: string | null;
  registerStatus: ApiStatus;
} = {
  user: undefined,
  fetchUserStatus: 'IDLE',
  registerStatus: 'IDLE',
  userError: null,
  registerUserError: null,
};

export const fetchCurrentUser = createAsyncThunk('users/getCurrentUser', () =>
  api.usersApi.getCurrentUser().then((res) => res.data.user)
);
export const registerUser = createAsyncThunk(
  'users/register',
  (user: CreateUser) =>
    api.usersApi
      .registerUser(user)
      .then((res) => res.data.user)
      .catch((err) => {
        throw objectErrorNorm(err);
      })
);
export const signInUser = createAsyncThunk(
  'users/signin',
  (user: AuthenticateUser) =>
    api.tokensApi
      .signinUser(user)
      .then((res) => res.data)
      .catch((err) => {
        throw errorNorm(err);
      })
);

export const signoutUser = createAsyncThunk('user/signout', () =>
  api.usersApi.signoutUser().then((res) => res.data.messgae)
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
    builder.addCase(signInUser.pending, (state, _) => {
      state.fetchUserStatus = 'PENDING';
      state.userError = null;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.fetchUserStatus = 'SUCCESS';
      state.userError = null;
      state.user = action.payload;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.fetchUserStatus = 'ERROR';
      state.userError = action.error.name ?? null;
    });
    builder.addCase(signoutUser.pending, (state, _) => {
      state.fetchUserStatus = 'PENDING';
    });
    builder.addCase(signoutUser.fulfilled, (state, _) => {
      state.fetchUserStatus = 'SUCCESS';
      state.user = undefined;
    });
    builder.addCase(signoutUser.rejected, (state, _) => {
      state.fetchUserStatus = 'ERROR';
    });
    builder.addCase(registerUser.pending, (state, _) => {
      state.registerStatus = 'PENDING';
      state.registerUserError = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registerStatus = 'SUCCESS';
      state.user = action.payload;
      state.registerUserError;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerStatus = 'ERROR';
      state.registerUserError = action.error.name ?? null;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const getUser = createSelector(
  (state: RootState) => state.user,
  (user) => user.user
);

export default userSlice.reducer;
