/** @format */

import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Welcome from "./parts/Welcome";
import Signup from "./parts/Signup";
import SignIn from "./parts/SignIn";


const Login = (props) => {
  return (
    <div className="login-container">
      <div className="logo">
        <img
          src="/images/logo.png"
          alt=""
        />
      </div>
      <Outlet/>
    </div>
  );
};

export default Login;

