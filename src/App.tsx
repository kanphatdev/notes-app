// App.tsx

import React, { useState, useEffect } from 'react';
import NoteForm from './components/NotesForm';
import PostItNote from './components/PostItNote';

const App: React.FC = () => {
  const [notes, setNotes] = useState<{ title: string; content: string }[]>([]);

  useEffect(() => {
    // Load notes from localStorage when component mounts
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
  }, []);

  const addNote = (title: string, content: string) => {
    const newNotes = [...notes, { title, content }];
    setNotes(newNotes);

    // Update localStorage with the new notes
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const closeNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    // Update localStorage after a note is closed
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div className="md:col-span-1 lg:col-span-2 xl:col-span-3">
        <NoteForm onSubmit={addNote} />
      </div>
      <div className="md:col-span-1 lg:col-span-2 xl:col-span-3">
        {notes.map((note, index) => (
          <PostItNote
            key={index}
            title={note.title}
            content={note.content}
            onClose={() => closeNote(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
