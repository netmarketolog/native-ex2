import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export const signUp = createAsyncThunk(
  'auth / signUp ',
  async ({ login, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let user = userCredential.user;
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const payload = {
        login: user.displayName,
        email: user.email,
        userId: user.uid,
      };

      return payload;
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth / logIn ',
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      let user = userCredential.user;
      const payload = {
        login: user.displayName,
        email: user.email,
        userId: user.uid,
      };

      return payload;
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const logOut = createAsyncThunk('auth / logOut ', async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.log(e.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refreshUser', async () => {
  try {
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, user => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('User not found'));
        }
      });
    });

    if (user) {
      const payload = {
        login: user.displayName,
        email: user.email,
        userId: user.uid,
      };
      return payload;
    } else {
      const payload = {
        login: null,
        email: null,
        userId: null,
      };
      return payload;
    }
  } catch (e) {
    console.log(e.message);
    throw e; // rethrow the error to be handled by the caller
  }
});
