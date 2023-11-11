import React from 'react'
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const Welcome = (props) => {
  const navigate = useNavigate();
  return (
    <div className="wl-container">
        <h1>Welcome To Sticky Notes</h1>
        <Button variant="outlined" onClick={()=>{navigate('signin')}}>Login</Button>
    </div>
  );
}

export default Welcome
