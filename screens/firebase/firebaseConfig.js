import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD-DTYi7wZt76NzMVxibd1-Ide6cp3bC-I',
  authDomain: 'react-native-social-hw.firebaseapp.com',
  projectId: 'react-native-social-hw',
  storageBucket: 'react-native-social-hw.appspot.com',
  messagingSenderId: '117541202941',
  appId: '1:117541202941:web:393ff86efaa735720cc794',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
