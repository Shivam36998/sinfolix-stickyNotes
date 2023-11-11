/** @format */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PalleteButton from "./PalleteButton";
import Heading from "./parts/Heading";

const MakeNotes = (props) => {
  let [heading, setHeading] = useState("");
  let [notesBody, setNotesBody] = useState("");
  let [color, setColor] = useState("#545FF6");


  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.edit) {
      let item = location.state.item;
      setHeading(item.heading);
      setNotesBody(item.body);
      document.getElementById(item.color).style.border = "1px solid black";
    }
  }, [props.edit]);

  const maxId = Math.max(...props.notes.map((note) => note.id));

  const editHandler = (e) => {
    const newe = props.notes.filter((element)=> element.id !== location.state.item.id);
    let newNote = {
      id: location.state.item.id,
      heading: heading,
      body: notesBody,
      color: color,
    };
    if (newNote.body.length || newNote.heading.length)
      props.setNotes([newNote, ...newe]);
    navigate("../home");
  };

  const postHandler = () => {
    let newNote = {
      id: maxId + 1,
      heading: heading,
      body: notesBody,
      color: color,
    };
    if (newNote.body.length || newNote.heading.length)
      props.setNotes([newNote, ...props.notes]);
    navigate("../home");
  };

  return (
    <div className="makeNotesArea">
      <Heading back={true}/>
      <div className="notes-makenotes-div">
        <div className="notes-makenotes-notes-heading">
          <input
            type="text"
            placeholder="Notes Title"
            value={heading}
            onChange={(e) => {
              setHeading(e.target.value);
            }}
          />
        </div>
        <div className="notes-makenotes-notes-body">
          <textarea
            name=""
            id=""
            placeholder="Write your note here"
            value={notesBody}
            onChange={(e) => {
              setNotesBody(e.target.value);
            }}></textarea>
        </div>
        <div className="bottomRow">
          <div className="colorPallete">
            <PalleteButton
              colorCode={"#545FF6"}
              setColor={setColor}
              labelName={"General"}
            />
            <PalleteButton
              colorCode={"#99610e"}
              setColor={setColor}
              labelName={"Work"}
            />
            <PalleteButton
              colorCode={"#326b41"}
              setColor={setColor}
              labelName={"Important"}
            />
            <PalleteButton
              colorCode={"#0e8d99"}
              setColor={setColor}
              labelName={"Random"}
            />
          </div>
          {!props.edit && <div
            className="notes-makesnotes-addbutton"
            onClick={() => {
              postHandler();
            }}>
            Post
          </div>}
          {props.edit && <div
            className="notes-makesnotes-addbutton"
            onClick={() => {
              editHandler();
            }}>
            Edit
          </div>}

        </div>
      </div>
    </div>
  );
};

export default MakeNotes;
