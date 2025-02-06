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
  const [email,setEmail]=useState('');
  const [phoneno,setPhoneno]=useState('');
  const [address,setAdress]=useState('');
  const [userData, setUserData] = useState<any>(null);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const updatedData = {
      id: userData[0]?.id || 0,
      name: name || userData[0]?.name, 
      email: userData[0]?.email, 
      phone: userData[0]?.phone,
      address: userData[0]?.address,
    };

    
    dispatch(setFormData(updatedData));

    
    const updatedUserData = userData.map((item: any) => 
      item.id === updatedData.id ? updatedData : item
    );
    localStorage.setItem('userData', JSON.stringify(updatedUserData)); 

    
    toast.success("Data updated successfully!");

   
    setName('');
  };

  useEffect(() => {
    
    const data = localStorage.getItem('userData');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        console.log("Parsed data:", parsedData);

       
        if (parsedData && Array.isArray(parsedData)) {
          setUserData(parsedData);
          console.log(userData)
        } else {
          setUserData([parsedData]); 
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
        <div className="form-container">
          <div className="form-id">
            <strong>ID:</strong> {userData[2]?.id} 
          </div>

         
          <Input
            className="form-input"
            value={ userData[2]?.name} 
            label="Name"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="form-input"
            value={ userData[2]?.email} 
            label="Name"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="form-input"
            value={ userData[2]?.phone} 
            label="Name"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => setPhoneno(e.target.value)}
          />
         <Input
            className="form-input"
            value={ userData[2]?.address} 
            label="Name"
            placeholder="Enter your name"
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

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default DisplayData;
