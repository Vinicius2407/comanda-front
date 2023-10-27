import axios from 'axios';

const api = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    baseURL: "https://60a1-2001-1284-f033-a5bc-5555-3ae2-7c9d-f714.ngrok-free.app",
});

export default api;