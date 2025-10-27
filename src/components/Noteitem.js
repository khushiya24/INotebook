import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = ({ note, updateNote }) => {
  const { deleteNote } = useContext(noteContext);

  return (
    <div className="card my-3 h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{note.title}</h5>
          <div>
            {/* Delete Button */}
            <i
              className="fa-solid fa-trash mx-2 text-danger"
              role="button"
              title="Delete Note"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this note?")) {
                  deleteNote(note._id);
                }
              }}
            ></i>

            {/* Edit Button */}
            <i
              className="fa-solid fa-pen-to-square mx-2 text-primary"
              role="button"
              title="Edit Note"
              onClick={() => updateNote(note)}
            ></i>
          </div>
        </div>
        <p className="card-text mt-2">{note.description}</p>
        {note.tag && (
          <span className="badge bg-secondary">{note.tag}</span>
        )}
      </div>
    </div>
  );
};

export default Noteitem;
