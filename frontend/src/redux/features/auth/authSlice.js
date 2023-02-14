import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from './authService.js';

const CONSTANTS = {
  REGISTER: 'auth.registerUser',
  LOGIN: 'auth.loginUser',
  LOGOUT: 'auth.logoutUser',
};

export const registerUser = createAsyncThunk(CONSTANTS.REGISTER, authService.register);
export const loginUser = createAsyncThunk(CONSTANTS.LOGIN, authService.login);
export const logoutUser = createAsyncThunk(CONSTANTS.LOGOUT, authService.logout);

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: {
    // Register
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.user = null;
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = payload;
    },
    // Login
    [loginUser.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.user = null;
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = payload;
    },
    // Logout
    [logoutUser.fulfilled]: (state, { payload }) => {
      state.user = null;
    },
  },
});

export const { resetState } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const authSelector = {
  getAll: ({ auth }) => auth,
};
