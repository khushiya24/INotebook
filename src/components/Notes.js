// import React, { useContext } from "react";
// import noteContext from "../context/notes/noteContext";
// import Noteitem from "./Noteitem";

// const Notes = () => {
//   const context = useContext(noteContext);
//   const { notes } = context;

//   return (
//     <div className="container my-3">
//       <h2>Your Notes</h2>
//       <div className="row">
//         {notes.map((note) => (
//           <div className="col-md-6" key={note._id}>
//             <div className="h-100">
//               <Noteitem note={note} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notes;

import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";   // ✅ fixed

const Notes = () => {
  const { notes, getNotes, editNote } = useContext(NoteContext);
  const navigate = useNavigate();   // ✅ instead of useHistory

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");   // ✅ navigate instead of history.push
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    console.log("Updating the note...", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal for editing note */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row">
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div className="col-md-3 mb-3" key={note._id}>
                <div className="h-100">
                  <Noteitem note={note} updateNote={updateNote} />
                </div>
              </div>
            ))
          ) : (
            <p>No notes available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
