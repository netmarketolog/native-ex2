import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, signUp } from './authOperations';

const initialState = {
  user: { login: null, email: null, userId: null },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshUser: (state, action) => ({
      ...state,
      user: action.payload.user,
      isLoggedIn: action.payload.isLoggedIn,
    }),
  },
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
      }),
});
