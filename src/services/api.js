import axios from 'axios';

const api = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    baseURL: "https://6dfe-2001-1284-f033-a453-5116-8751-c819-7c4a.ngrok-free.app",
});

export default api;