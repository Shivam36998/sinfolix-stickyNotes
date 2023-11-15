import React, { useState } from 'react'
import Heading from './parts/Heading'
import NotesCard from './parts/NotesCard';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { db } from './config/firebase';
import { doc, getDoc  } from 'firebase/firestore';

const Archive = (props) => {
  let [list, setList] = useState(props.archiveNotes);
  return (
    <div className="archive">
      <Heading
        back={true}
        darkTheme={props.darkTheme}
        setDarkTheme={props.setDarkTheme}
      />
      <DragDropContext
        onDragEnd={(result) => console.log("drag event occured", result)}>
        <div className='archive-notes-box'>
          <Droppable
            droppableId="Root"
            type="group">
            {(provided) => (
              <div
                className="notes-box"
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
                        archive={true}
                        number={index}
                        notes={props.notes}
                        setList={setList}
                        setNotes={props.setNotes}
                        archiveNotes={props.archiveNotes}
                        setArchiveNotes={props.setArchiveNotes}
                        provided={provided}
                        innerRef={provided.innerRef}
                        userEmail={props.userEmail}
                      />
                    )}
                  </Draggable>
                ))}
                {!list.length && (
                  <div> Nothing to See here!! Create a new Note</div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Archive
