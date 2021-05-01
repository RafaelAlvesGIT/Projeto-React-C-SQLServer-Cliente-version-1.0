import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44314/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        mode: 'no-cors',
      }
});

export default api;