import React, { useState, useEffect } from "react";
import NoteForm from "./components/NotesForm";
import PostItNote from "./components/PostItNote";
import HistoryNotes from "./components/HistoryNotes";
import RestoreNotes from "./components/RestoreNotes";

export interface Note {
  id: number;
  title: string;
  content: string;
  restorable?: boolean;
  historical?: boolean;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedNotes = JSON.parse(
          localStorage.getItem("notes") || "[]"
        ) as Note[];
        setNotes(storedNotes);
      } catch (error) {
        console.error("Error loading notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const addNote = (title: string, content: string) => {
    const newNote: Note = { id: Date.now(), title, content, restorable: true };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const updateNote = (id: number, newTitle: string, newContent: string) => {
    const updatedNotes = notes.map((note: Note) =>
      note.id === id
        ? { ...note, title: newTitle, content: newContent, historical: true }
        : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const closeNote = (id: number) => {
    const updatedNotes = notes.filter((note: Note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const moveToHistory = (id: number) => {
    const noteIndex = notes.findIndex((note: Note) => note.id === id);
    if (noteIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[noteIndex].historical = true;
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    }
  };

  const restoreNote = (id: number) => {
    const historicalNoteIndex = notes.findIndex(
      (note: Note) => note.id === id && note.historical
    );

    if (historicalNoteIndex !== -1) {
      const updatedNotes = notes.map((note, index) =>
        index === historicalNoteIndex ? { ...note, historical: false } : note
      );

      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Column 1 (spanning 2 columns on medium screens) */}
      <div className="md:col-span-2 p-4">
        <NoteForm onSubmit={addNote} />
      </div>

      {/* Column 2 */}
      <div className="p-4 md:col-span-2">
        <HistoryNotes notes={notes.filter((note) => note.historical)} />
      </div>

      {/* Column 3 */}
      <div className="p-4 md:col-span-2">
        <RestoreNotes notes={notes.filter((note) => note.restorable)} onRestore={restoreNote} />
      </div>

      {/* Column 4 */}
      <div className="p-4 md:col-span-2">
        <div className="">
          {loading ? (
            <p>Loading...</p>
          ) : (
            notes.map((note: Note) => (
              <PostItNote
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                onClose={() => closeNote(note.id)}
                onUpdate={(id, newTitle, newContent) =>
                  updateNote(id, newTitle, newContent)
                }
                onMoveToHistory={() => moveToHistory(note.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
