// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAv_JVpRfCUBofOFS9MYJegjSa-A0YMfM",
  authDomain: "centralized-manila.firebaseapp.com",
  projectId: "centralized-manila",
  storageBucket: "centralized-manila.appspot.com",
  messagingSenderId: "568288119757",
  appId: "1:568288119757:web:66a06534bfbd283184d284",
  measurementId: "G-19ZTV6NFZV"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const authInstance = getAuth(firebaseApp);

export default authInstance;