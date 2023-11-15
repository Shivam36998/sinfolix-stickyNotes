/** @format */

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { addDoc, collection, doc, setDoc} from "firebase/firestore";
import { db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


const Signup = (props) => {

  let {userEmail, setUserEmail} = props;
  let [password, setpassword] = useState("");
  let [checkPassword, setCheckPassword] = useState("");
  let [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const createCollection = async () => {
    try {
      const collectionRef = doc(db, "stickyNotes", userEmail);
      await setDoc(collectionRef, {
        notes: [],
        archiveNotes: [],
        profile: {
          Email: userEmail,
          notes: 0,
          archivedNotes: 0,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  const submitHandler = async() => {
    if (userEmail.length == 0) {
      setPasswordError("Name cannot be empty");
    } else if (password.length === 0) {
      setPasswordError("Password cannot be empty");
    } else if (password === checkPassword) {
      setPasswordError("");
      await createUserWithEmailAndPassword(auth, userEmail, password);
      await createCollection();
      navigate('../home');
    } else {
      setPasswordError("Passwords do not match");
    }
  };

  const signInWithGoogle =  async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      await createUserWithEmailAndPassword(auth, userEmail, password);
      await createCollection();
      navigate("../home");
    } catch (error) {
      console.log(error);
    }
  }

  const signOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="signup">
        <div className="signup-buttons">
          <div className="signup-button signup-active">Sign UP</div>
          <Link
            to="/signin"
            className="signup-button signup-inactive">
            Sign IN
          </Link>
        </div>
        <div className="formArea">
          <FormGroup className="form">
            <FormControl className="inputdiv">
              <InputLabel className="label"> Email </InputLabel>
              <Input
                className="input"
                type="email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl className="inputdiv">
              <InputLabel className="label"> Set Password </InputLabel>
              <Input
                className="input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </FormControl>
            <FormControl className="inputdiv">
              <InputLabel className="label"> Re-Enter Password </InputLabel>
              <Input
                className="input"
                type="password"
                id="checkPassword"
                value={checkPassword}
                onChange={(e) => {
                  setCheckPassword(e.target.value);
                }}
              />
            </FormControl>
          </FormGroup>
        </div>
        <Button
          variant="primary"
          className="submit-button signup-active"
          onClick={submitHandler}>
          Create New Account
        </Button>
        <p>
          Already signed up?{" "}
          <span className="link">
            <Link to="/signin"> sign in</Link>
          </span>
        </p>
        <p className="password-footer">{passwordError}</p>
      </div>
    </>
  );
};

export default Signup;
