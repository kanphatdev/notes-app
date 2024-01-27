// App.tsx

import React, { useState, useEffect } from 'react';
import NoteForm from './components/NotesForm';
import PostItNote from './components/PostItNote';

const App: React.FC = () => {
  const [notes, setNotes] = useState<{ id: number; title: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        setNotes(storedNotes);
      } catch (error) {
        console.error('Error loading notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const addNote = (title: string, content: string) => {
    const newNotes = [...notes, { id: Date.now(), title, content }];
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const updateNote = (id: number, newTitle: string, newContent: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, title: newTitle, content: newContent } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const closeNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <NoteForm onSubmit={addNote} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        notes.map((note) => (
          <PostItNote
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onClose={() => closeNote(note.id)}
            onUpdate={(newTitle, newContent) => updateNote(note.id, newTitle, newContent)}
          />
        ))
      )}
    </div>
  );
};

export default App;
