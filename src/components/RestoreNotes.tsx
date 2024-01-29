import React from 'react';
import { Note } from '../App';

interface RestoreNotesProps {
  notes: Note[];
  onRestore: (id: number) => void;
}

const RestoreNotes: React.FC<RestoreNotesProps> = ({ notes, onRestore }) => {
  const restorableNotes = notes.filter((note) => note.restorable);

  const handleRestore = (id: number) => {
    onRestore(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Restore Notes</h1>
      {restorableNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {restorableNotes.map((note: Note) => (
            <div key={note.id} className="p-4 rounded shadow-md mb-4 bg-green-100">
              <h2 className="text-lg font-bold">{note.title}</h2>
              <p className="text-gray-700">{note.content}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleRestore(note.id)}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> No notes to restore.</span>
        </div>
      )}
    </div>
  );
};

export default RestoreNotes;
