import React, { useState } from 'react';

interface NoteFormProps {
  onSubmit: (title: string, content: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title, content);
    // Reset the form after submission
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded p-6 shadow-md mb-4">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-600 font-semibold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full input p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter title"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-600 font-semibold mb-2">
          Content:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          className="w-full textarea p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter content"
          rows={4}
          required
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Create Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
