// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6IEGs9O_ggA3_JYFGjkiiAP3HgOtzzzQ",
  authDomain: "centralized-manila-1028c.firebaseapp.com",
  projectId: "centralized-manila-1028c",
  storageBucket: "centralized-manila-1028c.appspot.com",
  messagingSenderId: "950121274573",
  appId: "1:950121274573:web:d2c6a9e121629a84e81d84"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const authInstance = getAuth(firebaseApp);

export default authInstance;