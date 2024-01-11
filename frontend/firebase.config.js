// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK7GNS0d3_9olLywkTOVFeCxA3dGS1fXM",
  authDomain: "centralized-manila-a410a.firebaseapp.com",
  projectId: "centralized-manila-a410a",
  storageBucket: "centralized-manila-a410a.appspot.com",
  messagingSenderId: "100816911193",
  appId: "1:100816911193:web:7799e6ef3fabf594cdea48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;