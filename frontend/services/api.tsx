// frontend/services/api.ts
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;
