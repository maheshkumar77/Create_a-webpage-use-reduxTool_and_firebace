import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../store/userSlice';
import { Input } from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify styles
import './DisplayData.css'; // Import external CSS for styling

const DisplayData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState<any>(null);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a formData object and preserve other fields unchanged
    const updatedData = {
      id: userData[0]?.id || 0,
      name: name || userData[0]?.name, // Only update name, keep other fields unchanged
      email: userData[0]?.email,
      phone: userData[0]?.phone,
      address: userData[0]?.address,
    };

    // Dispatch action to Redux store
    dispatch(setFormData(updatedData));

    // Update the localStorage with the new data
    const updatedUserData = userData.map((item: any) => 
      item.id === updatedData.id ? updatedData : item
    );
    localStorage.setItem('userData', JSON.stringify(updatedUserData)); // Store updated data in localStorage

    // Show success notification
    toast.success("Data updated successfully!");

    // Reset form fields
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  useEffect(() => {
    // Load user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        console.log("Parsed data:", parsedData);

        // Check if the data is an array or a single object
        if (parsedData && Array.isArray(parsedData)) {
          setUserData(parsedData);
        } else {
          setUserData([parsedData]); // If it's a single object, convert it into an array
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  return (
    <div className="display-data-container">
      <h3 className="title">Stored Data</h3>

      {/* Display stored user data */}
      {userData && userData.length > 0 ? (
        userData.map((i, index) => (
          <div key={index} className="form-container">
            <div className="form-id">
              <strong>ID:</strong> {i.id} {/* Display the ID */}
            </div>

            <Input
              className="form-input"
              value={  i.name} // Use the state value or the stored value
              label="Name"
              placeholder="Enter your name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="form-input"
              value={i.email}
              label="Email"
              placeholder="Enter your email"
              type="email"
              readOnly // Make the email field read-only
            />
            <Input
              className="form-input"
              value={i.phone}
              label="Phone"
              placeholder="Enter your phone number"
              type="text"
              readOnly // Make the phone field read-only
            />
            <Input
              className="form-input"
              value={i.address}
              label="Address"
              placeholder="Enter your address"
              type="text"
              readOnly // Make the address field read-only
            />
            <Stack spacing={2} direction="row" className="button-container">
              <Button variant="contained" onClick={handleSubmit}>Save</Button>
            </Stack>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default DisplayData;
