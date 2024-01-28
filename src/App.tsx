// App.tsx

import React, { useState, useEffect } from 'react';
import NoteForm from './components/NotesForm';
import PostItNote from './components/PostItNote';
import RestoreNotes from './components/RestoreNotes';
import HistoryNotes from './components/HistoryNotes';

export interface Note {
  id: number;
  title: string;
  content: string;
  restorable?: boolean; // Add this line
}


const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]') as Note[];
        setNotes(storedNotes);
      } catch (error) {
        console.error('Error loading notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

// App.tsx

const addNote = (title: string, content: string) => {
  const newNote: Note = { id: Date.now(), title, content, restorable: true }; // Set restorable to true
  const newNotes = [...notes, newNote];
  setNotes(newNotes);
  localStorage.setItem('notes', JSON.stringify(newNotes));
};


  const updateNote = (id: number, newTitle: string, newContent: string) => {
    const updatedNotes = notes.map((note: Note) =>
      note.id === id ? { ...note, title: newTitle, content: newContent } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const closeNote = (id: number) => {
    const updatedNotes = notes.filter((note: Note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const restoreNote = (id: number) => {
    const restoredNote = notes.find((note: Note) => note.id === id);
    if (restoredNote) {
      addNote(restoredNote.title, restoredNote.content);
      closeNote(id);
      // Update localStorage after restoring
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <RestoreNotes notes={notes} onRestore={restoreNote} />
      <div className="md:col-span-1">
        <NoteForm onSubmit={addNote} />
      </div>
      <HistoryNotes />
      <div className="md:col-span-1">
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
              onUpdate={(id, newTitle, newContent) => updateNote(id, newTitle, newContent)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
