// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ940c0oNSp6gdMLvowRcjJVgbytyCo8I",
  authDomain: "centralized-manila-3a089.firebaseapp.com",
  projectId: "centralized-manila-3a089",
  storageBucket: "centralized-manila-3a089.appspot.com",
  messagingSenderId: "1043594408268",
  appId: "1:1043594408268:web:9151452b7f026c0e5b5fe9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;