/** @format */

import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const SignIn = (props) => {
  let [userName, setUserName] = useState("");
  let [password, setpassword] = useState("");
  let [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const submitHandler = () => {
    if (userName.length == 0) {
      setPasswordError("Name cannot be empty");
    } else if (password.length === 0) {
      setPasswordError("Password cannot be empty");
    }
    else if (password === checkPassword) {
      setPasswordError("");
      navigate('../home')
    }
    else {
      setPasswordError("Passwords do not match");
    }
  };

  return (
    <>
      <div className="signup">
        <div className="signup-buttons">
          <Link
            to="/signup"
            className="signup-button signup-inactive">
            Sign UP
          </Link>
          <div className="signup-button signup-active">Sign IN</div>
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
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </FormControl>
          </FormGroup>
        </div>
        <Button
          variant="primary"
          className="submit-button signup-active"
          onClick={submitHandler}>
          Sign IN
        </Button>
        <p>
          Don't Have An Account?{" "}
          <span className="link">
            <Link to="/signup">sign up</Link>
          </span>
        </p>
        <p className="password-footer">{passwordError}</p>
      </div>
    </>
  );
};

export default SignIn;
