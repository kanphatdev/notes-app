import React, { useState } from 'react';
import Close from '../icon/Close';

interface PostItNoteProps {
  id: number; // Add id property
  title: string;
  content: string;
  onClose: () => void;
  onUpdate: (newTitle: string, newContent: string) => void;
}

const PostItNote: React.FC<PostItNoteProps> = ({ id, title, content, onClose, onUpdate }) => {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(id, newTitle, newContent); // Include id in the update function
    setEditing(false);
  };

  const handleCancelClick = () => {
    // Reset the edited values
    setNewTitle(title);
    setNewContent(content);
    setEditing(false);
  };

  return (
    <div className="bg-yellow-200 p-4 rounded shadow-md mb-4 relative flex flex-col md:flex-row md:items-center">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
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
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-gray-700">{content}</p>
          </div>
        )}
        <div className="flex">
          {isEditing ? (
            <>
              <button
                className="text-green-500 hover:text-green-700 mr-2"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="text-gray-600 hover:text-blue-500 mr-2"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="text-gray-600 hover:text-red-500"
                onClick={onClose}
              >
                <Close />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostItNote;
