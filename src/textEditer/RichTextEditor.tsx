import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './reachaditer.css'; 

const RichTextEditor = () => {
  const [editorContent, setEditorContent] = useState<string>('');
  const [savedContent, setSavedContent] = useState<string>('');
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setEditorContent(parsedData[0].content);
          setSavedContent(parsedData[0].content); 
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

 
  const handleSave = () => {
    if (editorContent) {
      const updatedData = {
        id: 1,
        content: editorContent,
      };
     
      localStorage.setItem('userData', JSON.stringify([updatedData])); 
      setSavedContent(editorContent); 
      toast.success('Data saved successfully!');
    }
  };

  return (
    <div className="editor-container">
    
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
        <Button variant="contained" color="primary" >
          Save Content
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RichTextEditor;
