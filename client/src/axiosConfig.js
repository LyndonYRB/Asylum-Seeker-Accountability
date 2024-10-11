import axios from 'axios';

const api = axios.create({
    baseURL: 'https://asylum-seeker-log-backend-af4533a27029.herokuapp.com/api',
});

export default api;
