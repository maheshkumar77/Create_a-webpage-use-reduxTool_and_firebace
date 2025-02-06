import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import './reachaditer.css'; // Custom styles for the editor

const RichTextEditor = () => {
  const [editorContent, setEditorContent] = useState<string>('');
  const [savedContent, setSavedContent] = useState<string>('');
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  // Load the content from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setEditorContent(parsedData[0].content); // Assuming the content is in the 'content' field
          setSavedContent(parsedData[0].content); // Set saved content for display
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  // Function to handle editor changes
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  // Save the content to localStorage
  const handleSave = () => {
    if (editorContent) {
      const updatedData = {
        id: 1, // Assuming one user or you can generate IDs dynamically
        content: editorContent,
      };
      // Save to localStorage
      localStorage.setItem('userData', JSON.stringify([updatedData])); 
      setSavedContent(editorContent); // Update the saved content display
      toast.success('Data saved successfully!');
    }
  };

  return (
    <div className="editor-container">
      {/* <h2 className="editor-title">Rich Text Editor</h2> */}
      {isDataLoaded ? (
        <ReactQuill
          value={editorContent}
          onChange={handleEditorChange}
          theme="snow"
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              ['bold', 'italic', 'underline'],
              ['link'],
              ['image'],
              [{ 'align': [] }],
              ['blockquote', 'code-block'],
            ],
          }}
          className="editor"
        />
      ) : (
        <p>Loading user data...</p>
      )}

      <div className="actions">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Content
        </Button>
      </div>

      {/* <div className="saved-content">
        <h3>Saved Content</h3>
        <div className="saved-content-display">
          <div dangerouslySetInnerHTML={{ __html: savedContent }} />
        </div>
      </div> */}

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default RichTextEditor;
