import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from '../store/userSlice'; // Import action to store form data
import './userform.css';

const FormComponent = () => {
  const dispatch = useDispatch();

  // Form field state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Helper function to generate a unique ID (could be timestamp or incremental)
  const generateId = () => {
    // Check if there's an existing ID in localStorage
    const lastId = localStorage.getItem('lastId');
    const newId = lastId ? parseInt(lastId) + 1 : 1;

    // Store the new lastId for the next use
    localStorage.setItem('lastId', newId.toString());

    return newId;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a unique ID for this form submission
    const newId = generateId();

    // Create form data object with unique ID
    const formData = {
      id: newId, // Set the generated unique ID
      name,
      email,
      phone,
      address,
    };

    // Dispatch action to Redux store (to save form data in the store)
    dispatch(setFormData(formData));

    // Optionally store form data in localStorage or any other persistent storage
    const existingData = JSON.parse(localStorage.getItem('userData') || '[]');
    existingData.push(formData);
    localStorage.setItem('userData', JSON.stringify(existingData));

    // Show a basic notification (alert)
    alert('New user created successfully!');

    // Reset form fields
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  return (
    <div className="form-container">
      <h2 className="title">Create User Form</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label htmlFor="name" className="label">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone" className="label">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="address" className="label">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="input"
          />
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
