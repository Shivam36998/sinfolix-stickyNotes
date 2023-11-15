/** @format */

import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { googleProvider, auth } from "../config/firebase";

const Welcome = (props) => {
  // const {userEmail, setUserEmail} = props;
  console.log(props)
  const navigate = useNavigate();
  const createCollection = async (email) => {
    try {
      const collectionRef = doc(db, "stickyNotes", email);
      await setDoc(collectionRef, {
        notes: [],
        archiveNotes: [],
        profile: {
          Email: props.userEmail,
          notes: 0,
          archivedNotes: 0,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async () => {
    try {
      const result =  await signInWithPopup(auth, googleProvider);
      await props.setUserEmail(result.user.email);
      const collectionRef = doc(db, "stickyNotes", result.user.email);
      const check = await getDoc(collectionRef);

      if (!check.data().profile.Email)
        await createCollection(result.user.email);
      console.log("hululu ", check.data().profile.Email)
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithGoogle = async () => {
    signIn();
    setTimeout(()=>{
      navigate("home");
    }, 1000)
  }
  return (
    <div className="wl-container">
      <h1>Welcome To Sticky Notes</h1>
      <Button
        variant="outlined"
        onClick={() => {
          signInWithGoogle();
        }}>
        Login With Google
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("../signin");
        }}>
        Login With Email And Password
      </Button>
    </div>
  );
};

export default Welcome;
