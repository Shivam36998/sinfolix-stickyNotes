import React from 'react'

const PalleteButton = (props) => {
  return (
    <button
      className="colorLabel"
      id={props.colorCode}
      onClick={() => {
        props.setColor(props.colorCode);

        const elements = document.getElementsByClassName("colorLabel");
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.borderColor = "transparent";
        }

        document.getElementById(props.colorCode).style.border =
          "1px solid black";
      }}>
      <div
        className="colorCircle"
        style={{ backgroundColor: props.colorCode }}></div>
      <div className="labelName">{props.labelName}</div>
    </button>
  );
}

export default PalleteButton
