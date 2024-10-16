// client/src/App.js
import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import FloorSelection from './components/FloorSelection';
import HotelSelection from './components/HotelSelection';
import RoomSelection from './components/RoomSelection';
import AsylumSeekerList from './components/AsylumSeekerList'; // Import the new component

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setMessage('Logged out successfully');
  };

  return (
    <div className="App">
      <h1>Asylum Seeker Log App</h1>
      <div>
        <p>{message}</p>
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>

      <Routes>
        <Route path="/" element={token ? <Navigate to="/select-hotel" /> : <Navigate to="/" />} />
        <Route path="/select-hotel" element={token ? <HotelSelection /> : <Navigate to="/" />} />
        <Route path="/hotel/:hotelId" element={token ? <FloorSelection /> : <Navigate to="/" />} />
        <Route path="/hotel/:hotelId/floor/:floorNumber" element={token ? <RoomSelection /> : <Navigate to="/" />} />
        <Route path="/hotel/:hotelId/floor/:floorNumber/room/:roomNumber" element={token ? <AsylumSeekerList /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
