import React, { useEffect, useState } from 'react';

import 'react-quill/dist/quill.snow.css';



const DisplayData = () => {
  const [userData, setUserData] = useState<any>(null);

 
  useEffect(() => {
    // Load user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
      console.log(JSON.parse(data))
      console.log(userData);
    }
  }, []);

 

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-center">Stored Data</h3>
      
     
      {/* Display stored user data */}
      {userData ? (
        <div>
           <p><strong>Id:</strong> {userData.id}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Address:</strong> {userData.address}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DisplayData;
