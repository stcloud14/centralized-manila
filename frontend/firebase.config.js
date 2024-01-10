// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdHpLlcrc23KS-6KGf-BXuJuHOkFP7Cw8",
  authDomain: "centralized-manila-d5889.firebaseapp.com",
  projectId: "centralized-manila-d5889",
  storageBucket: "centralized-manila-d5889.appspot.com",
  messagingSenderId: "147438955751",
  appId: "1:147438955751:web:f9dd5deb10a5d5fe740642"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;