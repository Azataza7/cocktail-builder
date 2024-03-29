import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, User, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { googleLogin, login, logOutUser, register } from './usersThunks';

interface UsersState {
  user: User | null;

  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  logOutLoading: boolean;
}

const initialState: UsersState = {
  user: null,

  registerLoading: false,
  registerError: null,

  loginLoading: false,
  loginError: null,
  logOutLoading: false
};

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state: UsersState) => {
      state.registerError = null;
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state: UsersState, {payload: data}) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state: UsersState, {payload: error}) => {
      state.registerError = error || null;
      state.registerLoading = false;
    });

    builder.addCase(login.pending, (state: UsersState) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state: UsersState, {payload: data}) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(login.rejected, (state: UsersState, {payload: error}) => {
      state.loginLoading = true;
      state.loginError = error || null;
    });

    builder.addCase(logOutUser.pending, (state: UsersState) => {
      state.logOutLoading = true;
    });
    builder.addCase(logOutUser.fulfilled, (state: UsersState) => {
      state.logOutLoading = false;
      state.user = null;
    });
    builder.addCase(logOutUser.rejected, (state: UsersState) => {
      state.logOutLoading = false;
    });

    builder.addCase(googleLogin.pending, (state: UsersState) => {
      state.loginLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state: UsersState, {payload: data}) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(googleLogin.rejected, (state: UsersState, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  }
});

export const userReducer = UsersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;

export const selectUserLoading = (state: RootState) => state.users.registerLoading;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLogoutLoading = (state: RootState) => state.users.logOutLoading;

export const selectUserError = (state: RootState) => state.users.registerError;
export const selectLoginError = (state: RootState) => state.users.loginError;
