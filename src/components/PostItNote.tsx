// components/PostItNote.tsx

import React from 'react';
import Close from '../icon/Close';

interface PostItNoteProps {
  title: string;
  content: string;
  onClose: () => void;
}

const PostItNote: React.FC<PostItNoteProps> = ({ title, content, onClose }) => {
  return (
    <div className="bg-yellow-200 p-4 rounded shadow-md mb-4 relative flex flex-col md:flex-row md:items-center">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
        <h2 className="text-lg font-bold md:mb-0 md:mr-2">{title}</h2>
        <button
          className="text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <Close />
        </button>
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default PostItNote;
