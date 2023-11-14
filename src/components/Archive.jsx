import React, { useState } from 'react'
import Heading from './parts/Heading'
import NotesCard from './parts/NotesCard';

const Archive = (props) => {
  let [list, setList] = useState(props.archiveNotes);
  return (
    <div className="archive">
      <Heading
        back={true}
        darkTheme={props.darkTheme}
        setDarkTheme={props.setDarkTheme}
      />
      <div
        className="notes-box"
        style={{ marginTop: "20px" }}>
        {props.archiveNotes.map((item, index) => (
          <NotesCard
            key={index}
            item={item}
            archive={true}
            notes={props.notes}
            setList={setList}
            setNotes={props.setNotes}
            archiveNotes={props.archiveNotes}
            setArchiveNotes={props.setArchiveNotes}
          />
        ))}
      </div>
    </div>
  );
}

export default Archive
