import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXSxNrnq5EaUXoFeUgbdFjhhp4KfXqrzo",
  authDomain: "aarogya-f2b8b.firebaseapp.com",
  projectId: "aarogya-f2b8b",
  storageBucket: "aarogya-f2b8b.firebasestorage.app",
  messagingSenderId: "773010707191",
  appId: "1:773010707191:web:edc295e703b3f4e14c39f2",
  measurementId: "G-CCG6KG6L32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;

