// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmwuXYg_cs53583MYeHZqkqhw_nWk_DNs",
  authDomain: "centralized-manila-e1722.firebaseapp.com",
  projectId: "centralized-manila-e1722",
  storageBucket: "centralized-manila-e1722.appspot.com",
  messagingSenderId: "476854659347",
  appId: "1:476854659347:web:052ea24a361050119492e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;