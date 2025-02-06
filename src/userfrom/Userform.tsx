import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from '../store/userSlice'; 
import './userform.css';

const FormComponent = () => {
  const dispatch = useDispatch();

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  
  const generateId = () => {
  
    const lastId = localStorage.getItem('lastId');
    const newId = lastId ? parseInt(lastId) + 1 : 1;

   
    localStorage.setItem('lastId', newId.toString());

    return newId;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
    const newId = generateId();

    
    const formData = {
      id: newId, 
      name,
      email,
      phone,
      address,
    };

   
    dispatch(setFormData(formData));

  
    const existingData = JSON.parse(localStorage.getItem('userData') || '[]');
    existingData.push(formData);
    localStorage.setItem('userData', JSON.stringify(existingData));

    
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
