/** @format */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PalleteButton from "./parts/PalleteButton";
import Heading from "./parts/Heading";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase";

const MakeNotes = (props) => {
  // console.log(props);
  let [heading, setHeading] = useState("");
  let [notesBody, setNotesBody] = useState("");
  let [color, setColor] = useState("#545FF6");

  const location = useLocation();
  const navigate = useNavigate();
  let documentRef = doc(db, "stickyNotes", props.userEmail);

  useEffect(() => {
    if (props.edit) {
      let item = location.state.item;
      setHeading(item.heading);
      setNotesBody(item.body);
      document.getElementById(item.color).style.border = "1px solid black";
    }
  }, [props.edit]);

  const maxId = Math.max(
    0,
    ...props.notes.map((note) => note.id),
    ...props.archiveNotes.map((note) => note.id)
  );

  const editHandler = (e) => {
    const newe = props.notes.filter(
      (element) => element.id !== location.state.item.id
    );
    let newNote = {
      id: location.state.item.id,
      heading: heading,
      body: notesBody,
      color: color,
    };
    if (newNote.body.length || newNote.heading.length){
      let newlist = [newNote, ...newe];
      props.setNotes(newlist);
      try {
        updateDoc(documentRef, { notes: newlist });
      } catch (error) {
        console.log(error);
      }
    }
    navigate("../home");
  };

  const postHandler = async () => {
    let newNote = {
      id: maxId + 1,
      heading: heading,
      body: notesBody,
      color: color,
    };
    if (newNote.body.length || newNote.heading.length) {
      let newlist = [newNote, ...props.notes];
      props.setNotes(newlist);
      try {
        updateDoc(documentRef, {notes : newlist});
      } catch (error) {
        console.log(error)
      }
    }
    navigate("../home");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

  return (
    <div className="makeNotesArea">
      <Heading
        back={true}
        darkTheme={props.darkTheme}
        setDarkTheme={props.setDarkTheme}
      />
      <div className="notes-makenotes-div">
        <div className="notes-makenotes-notes-heading">
          <input
            type="text"
            placeholder="Notes Title"
            value={heading}
            onChange={(e) => {
              setHeading(e.target.value);
            }}
            style={{ color: props.darkTheme ? "#9e9b9b" : "black" }}
          />
        </div>
        <div className="notes-makenotes-notes-body">
          {/* <textarea
            name=""
            id=""
            placeholder="Write your note here"
            value={notesBody}
            onChange={(e) => {
              setNotesBody(e.target.value);
            }}
            style={{ color: props.darkTheme ? "#9e9b9b" : "black" }}></textarea> */}

          <ReactQuill
            theme="snow"
            value={notesBody}
            onChange={setNotesBody}
            placeholder="Write your note here"
            style={{ color: props.darkTheme ? "#9e9b9b" : "black" }}
            modules={modules}
            className="react-quill"
          />
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
          {!props.edit && (
            <div
              className="notes-makesnotes-addbutton"
              onClick={() => {
                postHandler();
              }}>
              Post
            </div>
          )}
          {props.edit && (
            <div
              className="notes-makesnotes-addbutton"
              onClick={() => {
                editHandler();
              }}>
              Edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeNotes;
