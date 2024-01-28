// HistoryNotes.tsx

import React from 'react';

const HistoryNotes: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">History Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Your historical notes will go here */}
        <div className="p-4 rounded shadow-md mb-4 bg-gray-100">
          <h2 className="text-lg font-bold">Historical Note 1</h2>
          <p className="text-gray-700">Note content goes here...</p>
          {/* Add any additional details you want to display */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Restore</button>
        </div>
        {/* Add more historical notes as needed */}
      </div>
    </div>
  );
};

export default HistoryNotes;
