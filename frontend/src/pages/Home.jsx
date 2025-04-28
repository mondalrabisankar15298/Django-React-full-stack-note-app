import { useState, useEffect } from "react";
import api from "../api";
// import backend from "../backend";
import Note from "../components/Note"
import "../styles/Home.css"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// function Home() {
//     const [notes, setNotes] = useState([]);
//     const [content, setContent] = useState("");
//     const [title, setTitle] = useState("");
//     const [editId, setEditId] = useState(null); // Track which note is being edited

//     useEffect(() => {
//         getNotes();
//     }, []);

//     const getNotes = () => {
//         api
//             .get("/api/notes/")
//             .then((res) => res.data)
//             .then((data) => {
//                 setNotes(data);
//                 console.log(data);
//             })
//             .catch((err) => alert(err));
//     };

//     const deleteNote = (id) => {
//         api
//             .delete(`/api/notes/delete/${id}/`)
//             .then((res) => {
//                 if (res.status === 204) alert("Note deleted!");
//                 else alert("Failed to delete note.");
//                 getNotes();
//             })
//             .catch((error) => alert(error));
//     };

//     const createNote = (e) => {
//         e.preventDefault();
//         api
//             .post("/api/notes/", { content, title })
//             .then((res) => {
//                 if (res.status === 201) alert("Note created!");
//                 else alert("Failed to make note.");
//                 getNotes();
//             })
//             .catch((err) => alert(err));
//     };

//     return (
//         <div>
//             <div>
//                 <h2>Notes</h2>
//                 {notes.map((note) => (
//                     <Note note={note} onDelete={deleteNote} key={note.id} />
//                 ))}
//             </div>
//             <h2>Create a Note</h2>
//             <form onSubmit={createNote}>
//                 <label htmlFor="title">Title:</label>
//                 <br />
//                 <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     required
//                     onChange={(e) => setTitle(e.target.value)}
//                     value={title}
//                 />
//                 <label htmlFor="content">Content:</label>
//                 <br />
//                 <textarea
//                     id="content"
//                     name="content"
//                     required
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                 ></textarea>
//                 <br />
//                 <input type="submit" value="Submit"></input>
//             </form>
//         </div>
//     );
// }

// export default Home;

// ... existing imports ...
function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [editId, setEditId] = useState(""); // Track which note is being edited

    useEffect(() => {
        getNotes();
    }, []);
    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login";
    }
    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const startEdit = (note) => {
        setEditId(note.id);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            // console.log(editId);
            // Update note
            api
                .put(`/api/notes/update/${editId}/`, { title, content })
                .then((res) => {
                    if (res.status === 200) alert("Note updated!");
                    else alert("Failed to update note.");
                    setEditId(null);
                    setTitle("");
                    setContent("");
                    getNotes();
                })
                .catch((err) => alert(err));
        } else {
            // Create note
            api
                .post("/api/notes/", { content, title })
                .then((res) => {
                    if (res.status === 201) alert("Note created!");
                    else alert("Failed to make note.");
                    setTitle("");
                    setContent("");
                    getNotes();
                })
                .catch((err) => alert(err));
        }
    };

    const cancelEdit = () => {
        setEditId(null);
        setTitle("");
        setContent("");
    };

    return (
        <div>
            <button onClick={() => logout()}>LogOut</button>
            <h2>{editId ? "Edit Note" : "Create a Note"}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value={editId ? "Update" : "Submit"} />
                {editId && <button type="button" onClick={cancelEdit}>Cancel</button>}
            </form>
            <div>
                <h2>Notes</h2>
                
                {notes.map((note) => (
                    <div key={note.id}>
                        <Note note={note} onDelete={deleteNote} onEdit={startEdit} />
                        {/* <button onClick={() => startEdit(note)}>Edit</button> */}
                    </div>
                    
                ))}
            </div>
        </div>
    );
}

export default Home;