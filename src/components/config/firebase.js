import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBzalu-OxnIirpvbvIqAx-UJgnJhpsa2gg",
    authDomain: "sticky-notes-23bb4.firebaseapp.com",
    projectId: "sticky-notes-23bb4",
    storageBucket: "sticky-notes-23bb4.appspot.com",
    messagingSenderId: "216190577756",
    appId: "1:216190577756:web:90248e9e4f3e8511e0ca99",
    measurementId: "G-1CZ4TC35NC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);