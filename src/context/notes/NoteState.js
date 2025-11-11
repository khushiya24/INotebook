// import { useState } from "react";
// import NoteContext from "./noteContext";

// const NoteState = (props) => {
//   const host = "http://localhost:5000";
//   const notesInitial = []

//   // ✅ use notesInitial here
//   const [notes, setNotes] = useState(notesInitial);

//   // Get all  notes
//   const getNotes = async () => {
//     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//       method: "GET",
//       headers: {
//         "content-Type": "application/json",
//         "auth-token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhYmY1OTY4YmE5MGFjYzQ1ZTZlMGFkIn0sImlhdCI6MTc1NjYyODg5NCwiZXhwIjoxNzU2NjMyNDk0fQ.sW56vtRnN0e78l0yxZNPIsuskjiYfeYerWP2JdOieNM",
//       },
//     });
//     const json = await response.json()
//     console.log(json);
//     setNotes(json);
    

    
//   };
//   // Add a note
//   const addNote = async (title, description, tag) => {
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: "POST",
//       headers: {
//         "content-Type": "application/json",
//         "auth-token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhYmY1OTY4YmE5MGFjYzQ1ZTZlMGFkIn0sImlhdCI6MTc1NjYyODg5NCwiZXhwIjoxNzU2NjMyNDk0fQ.sW56vtRnN0e78l0yxZNPIsuskjiYfeYerWP2JdOieNM",
//       },
//       body: JSON.stringify({title, description, tag}),
//     });
    
    

//     console.log("Adding a new note");
//     const note = {
//       _id: Date.now().toString(), // ✅ unique id
//       user: "68abf5968ba90acc45e6e0ad",
//       title,
//       description,
//       tag,
//       date: new Date().toISOString(),
//       __v: 0,
//     };

    
//     setNotes((prevNotes) => prevNotes.concat(note)); // ✅ safe update
//   };

//   // Delete a note
//   const deleteNote = (id) => {
//     console.log("Deleting the note with id " + id);
//     setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
//   };

//   // Edit a note
//   const editNote = async (id, title, description, tag) => {
//     // API call
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: "POST",
//       headers: {
//         "content-Type": "application/json",
//         "auth-token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhYmY1OTY4YmE5MGFjYzQ1ZTZlMGFkIn0sImlhdCI6MTc1NjYyODg5NCwiZXhwIjoxNzU2NjMyNDk0fQ.sW56vtRnN0e78l0yxZNPIsuskjiYfeYerWP2JdOieNM",
//       },
//       body: JSON.stringify({title, description, tag}),
//     });
//     const json =  response.json();

//     // logic to edit in client
//     for (let index = 0; index < notes.length; index++) {
//       const element = notes[index];
//       if (element._id === id) {
//         element.title = title;
//         element.description = description;
//         element.tag = tag;
//       }
//     }
//   };

//   return (
//     <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes}}>
//       {props.children}
//     </NoteContext.Provider>
//   );
// };

// export default NoteState;


import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://inotebook-backend-v6gc.onrender.com";

  const [notes, setNotes] = useState([]);

  // 📌 Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const data = await response.json();
    setNotes(data); // ✅ update state with fetched notes
  };

  // 📌 Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNote = await response.json();
    setNotes((prevNotes) => prevNotes.concat(newNote)); // ✅ append note
  };

  // 📌 Delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    // ✅ remove from state
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  };

  // 📌 Edit a note
const editNote = async (id, title, description, tag) => {
  await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem('token')
    },
    body: JSON.stringify({ title, description, tag }),
  });

  // ✅ update in state without reload
  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    )
  );
};


  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
