import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from '../store/userSlice'; // Import action to store form data

const FormComponent = () => {
  const dispatch = useDispatch();

  // Form field state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [id, setId] = useState<number>(100); // Number type for ID
  const [isDirty, setIsDirty] = useState(false); // Track if there are unsaved changes

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Increment ID
    const newId = id + 1; // Store the incremented ID before dispatching

    // Dispatch action to Redux store with the new ID
    dispatch(setFormData({ name, email, phone, address, id: newId }));

    // Save to Local Storage with the new ID
    const userData = { name, email, phone, address, id: newId };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Reset form fields
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setId(newId); // Set the new incremented ID for the next submission
    setIsDirty(false); // Reset dirty flag after save
  };

  // Set the dirty flag to true whenever the form is changed
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    // Attach the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  // Track form changes to detect unsaved changes
  const handleChange = (field: string, value: string) => {
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'phone') setPhone(value);
    if (field === 'address') setAddress(value);

    // Mark the form as dirty if any field changes
    setIsDirty(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">Create User Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700" htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
            className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
