
import React, {forwardRef, useEffect} from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveRoundedIcon from "@mui/icons-material/UnarchiveRounded";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const NotesCard = forwardRef((props, ref) => {
  const navigate = useNavigate();
  let documentRef = doc(db, "stickyNotes", props.userEmail)

  const deleteHandler = () => {
    let deletedList = props.notes.filter((item) => item.id !== props.item.id);
    props.setNotes(deletedList);
    props.setList(deletedList);
    updateDoc(documentRef, { notes: deletedList });
  };
  const archiveDeleteHandler = () => {
    let deletedlist = props.archiveNotes.filter(
      (item) => item.id !== props.item.id
      );
    props.setList(deletedlist);
    props.setArchiveNotes(deletedlist);
    updateDoc(documentRef, {archiveNotes : deletedlist});
  }
  const archiveHandler = () => {
    let newList = [props.item, ...props.archiveNotes];
    props.setArchiveNotes(newList);
    updateDoc(documentRef, { archiveNotes: newList });
    deleteHandler();
  }
  const unArchiveHandler = () => {
    let deletedList = props.archiveNotes.filter(
      (item) => item.id !== props.item.id
    );
    props.setArchiveNotes(deletedList);
    updateDoc(documentRef, { archiveNotes: deletedList });
    let newList = [props.item, ...props.notes];
    props.setNotes(newList);
    updateDoc(documentRef, { notes : newList });
    props.setList(deletedList);
  }
  const readHandler = () => {
    navigate('/show', {state : {item: props.item, archive: props.archive ? true : false}})
  }
  const color = props.item.color ? props.item.color : "#545FF6";

  return (
    <div
      className="notes-card"
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      ref={props.innerRef}>
      <div className="notes-card-innerDiv" style={{border:`1px solid ${color}`}}>
        <div
          className="heading"
          style={{ backgroundColor: color }}>
          {props.item.heading}{" "}
          <div className="icon-pallete">
            {" "}
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
                onClick={() =>
                  navigate("/edit", { state: { item: props.item } })
                }
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
    </div>
  );
});

export default NotesCard;
