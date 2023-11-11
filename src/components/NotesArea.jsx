/** @format */

import React, { useState } from "react";
import "./NotesArea.css";
import NotesCard from "./parts/NotesCard";
import { useNavigate } from "react-router-dom";

import Heading from "./parts/Heading";


const NotesArea = (props) => {
  let [list, setList] = useState(props.notes);

  const navigate = useNavigate();
  const searchHandler = (e) => {
    let key = e.target.value.toLowerCase().trim();
    let searchnotes = props.notes.filter((element) =>
      element.heading.toLowerCase().includes(key) || element.body.toLowerCase().includes(key)
    );
    setList(searchnotes);
  };
  return (
    <div className="notesArea">
      <Heading />
      <div className="notes-firstRow">
        <div
          className="notes-makenotes-button"
          onClick={() => {
            navigate("../makenote");
          }}>
          {" "}
          + Make A New Note
        </div>
        <div className="notes-search">
          <input
            type="text"
            placeholder="Search Notes"
            onChange={(e) => searchHandler(e)}
          />
        </div>
      </div>
      <div className="notes-main-Area">
        <div className="notes-box">
          {list.map((item, index) => (
            <NotesCard
              key={index}
              item={item}
              notes={props.notes}
              setList={setList}
              setNotes={props.setNotes}
              archiveNotes={props.archiveNotes}
              setArchiveNotes={props.setArchiveNotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesArea;
