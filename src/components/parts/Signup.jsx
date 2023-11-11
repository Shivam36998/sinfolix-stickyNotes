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

const Signup = (props) => {
  let [userName, setUserName] = useState("");
  let [password, setpassword] = useState("");
  let [checkPassword, setCheckPassword] = useState("");
  let [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const submitHandler = () => {
    if (userName.length == 0) {
      setPasswordError("Name cannot be empty");
    } else if (password.length === 0) {
      setPasswordError("Password cannot be empty");
    } else if (password === checkPassword) {
      setPasswordError("");
      navigate('../home');
    } else {
      setPasswordError("Passwords do not match");
    }
  };

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
              <InputLabel className="label"> Name </InputLabel>
              <Input
                className="input"
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
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
