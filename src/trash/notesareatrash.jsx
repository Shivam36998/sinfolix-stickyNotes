/** @format */

import React, { useState } from "react";
import "./NotesArea.css";
import NotesCard from "./parts/NotesCard";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import Heading from "./parts/Heading";

const NotesArea = (props) => {
  let [list, setList] = useState(props.notes);

  const navigate = useNavigate();
  const searchHandler = (e) => {
    let key = e.target.value.toLowerCase().trim();
    let searchnotes = props.notes.filter(
      (element) =>
        element.heading.toLowerCase().includes(key) ||
        element.body.toLowerCase().includes(key)
    );
    setList(searchnotes);
  };

  return (
    <div className="notesArea">
      <Heading
        darkTheme={props.darkTheme}
        setDarkTheme={props.setDarkTheme}
      />
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
            style={{
              borderColor: props.darkTheme ? "# " : "black",
              color: props.darkTheme ? "#9e9b9b" : "black",
            }}
            onChange={(e) => searchHandler(e)}
          />
        </div>
      </div>
      <DragDropContext
        onDragEnd={(result) => console.log("drag event occured", result)}>
        <div className="notes-main-Area">
          <div className="notes-box">
            <Droppable
              droppableId="Root"
              type="group">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {list.map((item, index) => (
                    <Draggable
                      draggableId={String(item.id)}
                      key={item.id}
                      index={index}>
                      {(provided) => (
                        <NotesCard
                          key={index}
                          item={item}
                          number={index}
                          notes={props.notes}
                          setList={setList}
                          setNotes={props.setNotes}
                          archiveNotes={props.archiveNotes}
                          setArchiveNotes={props.setArchiveNotes}
                          // {...provided.dragHandleProps}
                          // {...provided.draggableProps}
                          // ref={provided.innerRef}
                          provided={provided}
                          innerRef={provided.innerRef}
                        />
                        // <div {...provided.dragHandleProps}
                        //  {...provided.draggableProps}
                        //  ref={provided.innerRef} >
                        //   hi
                        // </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default NotesArea;
