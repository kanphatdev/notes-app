import React from 'react';
import { Note } from '../App';

interface HistoryNotesProps {
  notes: Note[];
}

const HistoryNotes: React.FC<HistoryNotesProps> = ({ notes }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">History Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 rounded shadow-md mb-4 bg-gray-100">
            <h2 className="text-lg font-bold">{note.title}</h2>
            <p className="text-gray-700">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryNotes;
