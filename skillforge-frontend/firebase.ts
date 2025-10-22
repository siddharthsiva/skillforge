import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh1Thy0sot6l1dTktAEGWkRc7p8KsSp4s",
  authDomain: "skillforge-e2173.firebaseapp.com",
  databaseURL: "https://skillforge-e2173-default-rtdb.firebaseio.com",
  projectId: "skillforge-e2173",
  storageBucket: "skillforge-e2173.firebasestorage.app",
  messagingSenderId: "764661260397",
  appId: "1:764661260397:web:cf3e3352290b95af021f64",
  measurementId: "G-FQR4J9H2G9"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
