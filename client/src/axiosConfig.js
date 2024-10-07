import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Update this with your server's URL when deployed
});

export default api;
