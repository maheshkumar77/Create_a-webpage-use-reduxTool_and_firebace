import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from '../store/userSlice';
import { Input } from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './DisplayData.css';

const DisplayData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [address, setAdress] = useState('');
  const [userData, setUserData] = useState<any>([]);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      id: userData[userData.length - 1]?.id || 0, 
      name: name || userData[userData.length - 1]?.name, 
      email: email || userData[userData.length - 1]?.email, 
      phone: phoneno || userData[userData.length - 1]?.phone,
      address: address || userData[userData.length - 1]?.address,
    };

    dispatch(setFormData(updatedData));

    const updatedUserData = userData.map((item: any) => 
      item.id === updatedData.id ? updatedData : item
    );
    
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    
    toast.success("Data updated successfully!");


    setName('');
    setEmail('');
    setPhoneno('');
    setAdress('');
  };

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        console.log("Parsed data:", parsedData);

        if (parsedData && Array.isArray(parsedData)) {
          setUserData(parsedData);
        } else {
          setUserData([parsedData]); 
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);


  const lastUser = userData[userData.length - 1];

  return (
    <div className="display-data-container">
      <h3 className="title">Stored Data</h3>

      {/* Display stored user data */}
      {userData && userData.length > 0 ? (
        <div className="form-container">
          <div className="form-id">
            <strong>ID:</strong> {lastUser?.id}
          </div>

          <Input
            className="form-input"
            value={name || lastUser?.name} 
            label="Name"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="form-input"
            value={email || lastUser?.email} 
            label="Email"
            placeholder="Enter your email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="form-input"
            value={phoneno || lastUser?.phone} 
            label="Phone"
            placeholder="Enter your phone number"
            type="text"
            onChange={(e) => setPhoneno(e.target.value)}
          />
          <Input
            className="form-input"
            value={address || lastUser?.address} // Display last user data or input value
            label="Address"
            placeholder="Enter your address"
            type="text"
            onChange={(e) => setAdress(e.target.value)}
          />

          <Stack spacing={2} direction="row" className="button-container">
            <Button variant="contained" onClick={handleSubmit}>Save</Button>
          </Stack>
        </div>
      ) : (
        <p>No data available</p>
      )}

      
      <ToastContainer />
    </div>
  );
};

export default DisplayData;
