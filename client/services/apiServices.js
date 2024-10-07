import axios from 'axios';

// Set the base URL for the API
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Function to handle user login
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        return response.data; // returns the token if login is successful
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to login');
    }
};

// Function to fetch logs
export const fetchLogs = async (hotelId) => {
    try {
        const response = await api.get(`/logs?hotelId=${hotelId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to fetch logs');
    }
};

// Other API functions can be added here...
