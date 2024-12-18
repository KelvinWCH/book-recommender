// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGg5de7Py5fP9lfcvnlLOu0B1g8knuAFg",
  authDomain: "book-recommender-46cb8.firebaseapp.com",
  projectId: "book-recommender-46cb8",
  storageBucket: "book-recommender-46cb8.firebasestorage.app",
  messagingSenderId: "47347236030",
  appId: "1:47347236030:web:f3c353f83294109c6772ef",
  measurementId: "G-GSCZ2ER0MS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const dataBase = getFirestore(app);