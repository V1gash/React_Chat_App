// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBifIVWDutPM7XM_N_IP67F6mokHq6GCn8",
    authDomain: "chat-app-c5ed9.firebaseapp.com",
    projectId: "chat-app-c5ed9",
    storageBucket: "chat-app-c5ed9.appspot.com",
    messagingSenderId: "462287250715",
    appId: "1:462287250715:web:67c6797db3f09cf0aa5fbe",
    measurementId: "G-YD3X520WLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
