// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVvMN2eh5n17at7zZ5CpXza2sRfBRIjvU",
  authDomain: "task-1-ff719.firebaseapp.com",
  projectId: "task-1-ff719",
  storageBucket: "task-1-ff719.appspot.com",
  messagingSenderId: "741794961152",
  appId: "1:741794961152:web:0d3a1d7c0958db805f05e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const Googleprovider = new GoogleAuthProvider();
export const auth = getAuth(app);
export default app;