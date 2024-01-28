// RestoreNotes.tsx

import React from 'react';

const RestoreNotes: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Restore Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Your restored notes will go here */}
        <div className="p-4 rounded shadow-md mb-4 bg-green-100">
          <h2 className="text-lg font-bold">Restored Note 1</h2>
          <p className="text-gray-700">Note content goes here...</p>
          {/* Add any additional details you want to display */}
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">Restore</button>
        </div>
        {/* Add more restored notes as needed */}
      </div>
    </div>
  );
};

export default RestoreNotes;
