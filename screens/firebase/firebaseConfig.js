import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
