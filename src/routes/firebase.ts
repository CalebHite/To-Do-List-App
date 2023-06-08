// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNKygdrn4CWxSTLmxHfccKyvrSGRG2upg",
  authDomain: "todolist-18229.firebaseapp.com",
  projectId: "todolist-18229",
  storageBucket: "todolist-18229.appspot.com",
  messagingSenderId: "594935609904",
  appId: "1:594935609904:web:e1537745d82dfc67970bf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);