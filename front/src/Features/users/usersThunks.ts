import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, LoginMutation, RegisterMutation, RegisterResponse, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk<RegisterResponse, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (state, {rejectWithValue}) => {

    const formData = new FormData();
    formData.append('email', state.email);
    formData.append('password', state.password);
    formData.append('displayName', state.displayName);

    if (state.avatar) {
      formData.append('avatar', state.avatar);
    }

    try {
      const response = await axiosApi.post('/users', formData);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<RegisterResponse, LoginMutation, { rejectValue: GlobalError }>(
  'users/login', 
  async (loginMutation, {rejectWithValue}) =>  {
    try {
      const response = await axiosApi.post<RegisterResponse>('users/sessions', loginMutation);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
);

export const googleLogin = createAsyncThunk<RegisterResponse, string, { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('users/google', {credential});

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
);

export const logOutUser = createAsyncThunk<void, string>(
  'users/logOut',
  async (token) => {
    await axiosApi.delete('/users/sessions', {
      headers: {
        Authorization: token
      }
    });
  }
);