import React from 'react'
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { googleProvider, auth } from "../config/firebase";

const createCollection = async (email) => {
    try {
        const collectionRef = doc(db, "stickyNotes", email);
        await setDoc(collectionRef, {
            notes: [],
            archiveNotes: [],
            profile: {
                Email: email,
                notes: 0,
                archivedNotes: 0,
            },
        });
    } catch (error) {
        console.error(error);
    }
};
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        props.setUserEmail(result.user.email);
        createCollection(result.user.email);
        return result.user.email;
    } catch (error) {
        console.log(error);
    }
};
export default signInWithGoogle
