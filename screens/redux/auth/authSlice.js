import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, signUp, refreshUser } from './authOperations';

const initialState = {
  user: { login: null, email: null, userId: null },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { login: null, email: null, userId: null };
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.user = { login: null, email: null, userId: null };
        state.isLoggedIn = false;
      }),
});
