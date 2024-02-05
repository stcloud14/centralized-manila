// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4mlw3vBexisTOW4PcM5kmucMPHSbvmko",
  authDomain: "centralized-manila-6.firebaseapp.com",
  projectId: "centralized-manila-6",
  storageBucket: "centralized-manila-6.appspot.com",
  messagingSenderId: "750085445781",
  appId: "1:750085445781:web:f564ff99476ef35ec9a39c",
  measurementId: "G-01F5G5RY7B"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const authInstance = getAuth(firebaseApp);

export default authInstance;