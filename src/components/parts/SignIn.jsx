// /** @format */

// import React, { useState } from "react";
// import {
//   FormGroup,
//   FormControl,
//   InputLabel,
//   Input,
//   Button,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";

// const SignIn = (props) => {
//   let [userName, setUserName] = useState("");
//   let [password, setpassword] = useState("");
//   let [passwordError, setPasswordError] = useState("");

//   const navigate = useNavigate();

//   const submitHandler = () => {
//     if (userName.length == 0) {
//       setPasswordError("Name cannot be empty");
//     } else if (password.length === 0) {
//       setPasswordError("Password cannot be empty");
//     }
//     else if (password === checkPassword) {
//       setPasswordError("");
//       navigate('../home')
//     }
//     else {
//       setPasswordError("Passwords do not match");
//     }
//   };

//   return (
//     <>
//       <div className="signup">
//         <div className="signup-buttons">
//           <Link
//             to="/signup"
//             className="signup-button signup-inactive">
//             Sign UP
//           </Link>
//           <div className="signup-button signup-active">Sign IN</div>
//         </div>
//         <div className="formArea">
//           <FormGroup className="form">
//             <FormControl className="inputdiv">
//               <InputLabel className="label"> Name </InputLabel>
//               <Input
//                 className="input"
//                 type="text"
//                 value={userName}
//                 onChange={(e) => {
//                   setUserName(e.target.value);
//                 }}
//               />
//             </FormControl>
//             <FormControl className="inputdiv">
//               <InputLabel className="label"> Set Password </InputLabel>
//               <Input
//                 className="input"
//                 type="password"
//                 value={password}
//                 onChange={(e) => {
//                   setpassword(e.target.value);
//                 }}
//               />
//             </FormControl>
//           </FormGroup>
//         </div>
//         <Button
//           variant="primary"
//           className="submit-button signup-active"
//           onClick={submitHandler}>
//           Sign IN
//         </Button>
//         <p>
//           Don't Have An Account?{" "}
//           <span className="link">
//             <Link to="/signup">sign up</Link>
//           </span>
//         </p>
//         <p className="password-footer">{passwordError}</p>
//       </div>
//     </>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = (props) => {
  let {userEmail, setUserEmail} = props;
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (userEmail.length === 0) {
      setPasswordError("Name cannot be empty");
    } else if (password.length === 0) {
      setPasswordError("Password cannot be empty");
    } else {
      try {
        // Authenticate user using Firebase Authentication
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, userEmail, password);

        // Clear any previous password error
        setPasswordError("");

        // Redirect to the home page after successful sign-in
        navigate("../home");
      } catch (error) {
        // Handle authentication errors (e.g., wrong credentials)
        console.error("Sign-in error:", error.message);
        setPasswordError("Invalid credentials. Please try again.");
      }
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
              <InputLabel className="label"> Email </InputLabel>
              <Input
                className="input"
                type="text"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl className="inputdiv">
              <InputLabel className="label"> Password </InputLabel>
              <Input
                className="input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
          </FormGroup>
        </div>
        <Button
          variant="contained"
          color="primary"
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
