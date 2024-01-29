// PostItNote.tsx

import React, { useState } from 'react';
import Close from '../icon/Close';
import Back from '../icon/Back';
import ArrowDown from '../icon/ArrowDown';
import Check from '../icon/Check';

interface PostItNoteProps {
  id: number;
  title: string;
  content: string;
  onClose: () => void;
  onUpdate: (id: number, newTitle: string, newContent: string) => void;
  onMoveToHistory: () => void;
}

const PostItNote: React.FC<PostItNoteProps> = ({
  id,
  title,
  content,
  onClose,
  onUpdate,
  onMoveToHistory,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(id, newTitle, newContent);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setNewTitle(title);
    setNewContent(content);
    setEditing(false);
  };

  const handleMoveToHistoryClick = () => {
    onMoveToHistory();
  };

  return (
    <div className={`p-4 rounded shadow-md mb-4 relative bg-yellow-200`}>
      <div className="flex flex-col md:flex-row md:items-center">
        {isEditing ? (
          <div className="mb-2 md:mb-0 md:mr-2 w-full">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-lg font-bold mb-2 w-full p-2 rounded input"
              placeholder="Enter title"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="text-gray-700 w-full p-2 rounded textarea"
              placeholder="Enter content"
              rows={4}
            />
          </div>
        ) : (
          <div className="mb-2 md:mb-0 md:mr-2">
            <h2 className="text-lg font-bold text-blue-800">{title}</h2>
            <p className="text-gray-700">{content}</p>
          </div>
        )}
        <div className="flex mt-2 md:mt-0">
          {isEditing ? (
            <>
              <button
                className="text-green-500 hover:text-green-700 mr-2"
                onClick={handleSaveClick}
              >
                <Check />
              </button>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCancelClick}
              >
                <Back />
              </button>
            </>
          ) : (
            <>
              <button
                className="text-gray-600 hover:text-blue-500 mr-2"
                onClick={handleEditClick}
              >
                <ArrowDown />
              </button>
              <button
                className="text-gray-600 hover:text-red-500"
                onClick={onClose}
              >
                <Close />
              </button>
              <button
                className="text-blue-600 hover:text-blue-800 ml-2"
                onClick={handleMoveToHistoryClick}
              >
                Move to History
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostItNote;
