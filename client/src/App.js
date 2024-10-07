import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import api from './axiosConfig';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', { username, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            setMessage('Login successful');
        } catch (error) {
            setMessage('Login failed: ' + error.response.data.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setMessage('Logged out successfully');
    };

    return (
        <Router>
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
                    <Routes>
                        <Route path="/dashboard" element={
                            <div>
                                <p>{message}</p>
                                <p>Welcome to the Dashboard!</p>
                                {/* Add more dashboard components here */}
                            </div>
                        } />
                    </Routes>
                )}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </Router>
    );
}

export default App;
