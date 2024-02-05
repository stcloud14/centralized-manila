// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF_SDAEnpbWa5HYK9SG-a6bHGuoCNE4mc",
  authDomain: "centralized-manila-7.firebaseapp.com",
  projectId: "centralized-manila-7",
  storageBucket: "centralized-manila-7.appspot.com",
  messagingSenderId: "46698189172",
  appId: "1:46698189172:web:19645ace4fd624358b1c21",
  measurementId: "G-4LG3LK6Z13"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const authInstance = getAuth(firebaseApp);

export default authInstance;