// client/src/App.js
import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import api from './axiosConfig';
import './App.css';
import FloorSelection from './components/FloorSelection';
import HotelSelection from './components/HotelSelection';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await api.post('/auth/login', { username, password });
            if (response && response.data && response.data.token) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token); // Store token in localStorage
                setMessage('Login successful');
                navigate('/select-hotel'); // Redirect to the hotel selection page after login
            } else {
                setMessage('Unexpected response format. Please try again later.');
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            if (error.response) {
                // The server responded with a status code outside of the 2xx range
                setMessage('Login failed: ' + (error.response.data.message || 'Invalid credentials'));
                console.error('Error response from server:', error.response);
            } else if (error.request) {
                // The request was made, but no response was received
                setMessage('Login failed: No response from server. Please try again later.');
                console.error('No response received:', error.request);
            } else {
                // Something else happened while setting up the request
                setMessage('Login failed: An unexpected error occurred.');
                console.error('Unexpected error during login:', error.message);
            }
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setMessage('Logged out successfully');
    };

    return (
        <div className="App">
            <h1>Asylum Seeker Log App</h1>
            {!token ? (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <p>{message}</p>
                    <p>Welcome to the Dashboard!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}

            <Routes>
                <Route path="/" element={token ? <Navigate to="/select-hotel" /> : <Navigate to="/" />} />
                <Route path="/select-hotel" element={token ? <HotelSelection /> : <Navigate to="/" />} />
                <Route path="/hotel/:hotelId" element={token ? <FloorSelection /> : <Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
