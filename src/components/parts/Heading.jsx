/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";

const Heading = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="notes-headerRow">
      {" "}
      <div>{props.back?<KeyboardBackspaceRoundedIcon className="heading-icon" onClick={()=>navigate(-1)}/>:"Hii... Shivam"}</div>
      <div>
        <div className={show ? "" : "hidden"}>
          <ArchiveIcon
            className={show ? "heading-icon" : "heading-icon hidden"}
            onClick={()=>{navigate('/archive')}}
          />
            <AccountCircleIcon className="heading-icon" />
            <DarkModeRoundedIcon className="heading-icon"/>
            <LightModeRoundedIcon className="heading-icon"/>
        </div>
        <MenuOpenRoundedIcon className="heading-icon" onClick={()=>{setShow(!show)}} />
      </div>
    </div>
  );
};

export default Heading;
