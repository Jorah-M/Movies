import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCSnvhm4U68IOAyjnaEEUZIKl_qYCRvJuc',
  authDomain: 'movies-comments-4e4c1.firebaseapp.com',
  projectId: 'movies-comments-4e4c1',
  storageBucket: 'movies-comments-4e4c1.appspot.com',
  messagingSenderId: '431591520711',
  appId: '1:431591520711:web:9a7bf67a38be12bccb81e2',
  measurementId: 'G-01GVFX9CNQ',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
