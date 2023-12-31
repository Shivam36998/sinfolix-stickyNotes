/** @format */

import React, { forwardRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveRoundedIcon from "@mui/icons-material/UnarchiveRounded";

const NotesCard = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const deleteHandler = () => {
    let deletedList = props.notes.filter((item) => item.id !== props.item.id);
    props.setNotes(deletedList);
    props.setList(deletedList);
  };

  const archiveDeleteHandler = () => {
    let deletedlist = props.archiveNotes.filter(
      (item) => item.id !== props.item.id
    );
    props.setArchiveNotes(deletedlist);
  };

  const archiveHandler = () => {
    props.setArchiveNotes([props.item, ...props.archiveNotes]);
    deleteHandler();
  };

  const unArchiveHandler = () => {
    let deletedList = props.archiveNotes.filter(
      (item) => item.id !== props.item.id
    );
    props.setArchiveNotes(deletedList);
    props.setNotes([props.item, ...props.notes]);
    props.setList(deletedList);
  };

  const readHandler = () => {
    navigate("/show", {
      state: { item: props.item, archive: props.archive ? true : false },
    });
  };

  const color = props.item.color ? props.item.color : "#545FF6";

  return (
    <div
      className="notes-card"
      style={{ border: `1px solid ${color}` }}
      {...props.provided.dragHandleProps}
      {...props.provided.draggableProps}
      ref={props.innerRef}>
      <div
        className="heading"
        style={{ backgroundColor: color }}
        {...props.dragHandleProps} // Add dragHandleProps to the heading
      >
        {props.item.heading}{" "}
        <div className="icon-pallete">
          {!props.archive && (
            <ArchiveIcon
              className="notes-card-icons"
              onClick={archiveHandler}
            />
          )}
          {props.archive && (
            <UnarchiveRoundedIcon
              className="notes-card-icons"
              onClick={unArchiveHandler}
            />
          )}
          {!props.archive && (
            <FaEdit
              className="notes-card-icons"
              onClick={() => navigate("/edit", { state: { item: props.item } })}
            />
          )}
          <MdDelete
            className="notes-card-icons"
            onClick={props.archive ? archiveDeleteHandler : deleteHandler}
            style={{ marginLeft: "-2px" }}
          />
        </div>
      </div>
      <div
        className="description"
        onClick={readHandler}
        dangerouslySetInnerHTML={{ __html: props.item.body }}
      />
    </div>
  );
});

export default NotesCard;
