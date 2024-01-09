// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHZ9eu41UNv21z21-SZz4RkHj7qSKCpQk",
  authDomain: "centralized-manila-bc1da.firebaseapp.com",
  projectId: "centralized-manila-bc1da",
  storageBucket: "centralized-manila-bc1da.appspot.com",
  messagingSenderId: "235789029593",
  appId: "1:235789029593:web:03a80e0beda30415e3aec8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;