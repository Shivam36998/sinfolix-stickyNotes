/** @format */

import React from "react";
import Heading from "./parts/Heading";
import { useLocation, useNavigate } from "react-router-dom";
const ShowNote = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="fullPage">
      <Heading
        back={true}
        darkTheme={props.darkTheme}
        setDarkTheme={props.setDarkTheme}
      />
      <div className="show-main-area">
        <div className="show-heading">{location.state.item.heading}</div>
        <div
          className="show-body"
          dangerouslySetInnerHTML={{ __html: location.state.item.body }}
        />
      </div>
      <div className="show-bottomRow">
        <div></div>
        {!location.state.archive && (
          <button
            className="notes-makesnotes-addbutton"
            onClick={() =>
              navigate("/edit", { state: { item: location.state.item } })
            }>
            EDIT
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowNote;
