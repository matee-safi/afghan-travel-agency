// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI1kPNU7d0rTUsc1Np27QODYnj9bSCF_Q",
  authDomain: "afghan-travel-agency.firebaseapp.com",
  projectId: "afghan-travel-agency",
  storageBucket: "afghan-travel-agency.appspot.com",
  messagingSenderId: "611750824045",
  appId: "1:611750824045:web:1189e0eac87c23adb39764",
  measurementId: "G-DZJSQXP9GF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);