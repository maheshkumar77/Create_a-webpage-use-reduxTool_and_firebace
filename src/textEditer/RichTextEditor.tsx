import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles for the editor
import { useLocalStorage } from './useLocalStorage'; // Custom hook to handle localStorage

// Tailwind CSS and Quill toolbar configuration
const toolbarOptions = [
  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'align': [] }],
  ['bold', 'italic', 'underline'],
  [{ 'color': [] }, { 'background': [] }],
  ['link'],
  ['blockquote', 'code-block'],
  ['clean']
];

const RichTextEditor: React.FC = () => {
  // Local state for editor content
  const [editorValue, setEditorValue] = useLocalStorage<string>('rich-text', '');

  useEffect(() => {
    // Load the editor value from localStorage or set to an empty string
    setEditorValue(editorValue);
  }, [editorValue]);

  // Handle editor change event
  const handleChange = (value: string) => {
    setEditorValue(value); // Save the updated value in localStorage
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Rich Text Editor</h2>

        {/* React Quill Editor */}
        <div className="mb-6">
          <ReactQuill
            value={editorValue}
            onChange={handleChange}
            modules={{ toolbar: toolbarOptions }}
            placeholder="Write your content here..."
            className="h-48 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
          />
        </div>

        {/* Display current content below editor */}
        <div className="mt-6 p-4 border-t">
          <h3 className="font-semibold text-lg text-gray-700 mb-4">Preview:</h3>
          <div
            className="text-lg text-gray-800"
            dangerouslySetInnerHTML={{ __html: editorValue }} // Rendering the editor content as HTML
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
