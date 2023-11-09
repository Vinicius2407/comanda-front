import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb21hbmRhZ28iLCJzdWIiOiJhYWEiLCJleHAiOjE2OTk1MjQxOTd9.akr2L5sNzuaW4_E4IUtydVH5Mqk8CevtFvsZXU_MaBc'
const api = axios.create({

    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`
    },
    baseURL: "http://10.0.2.2:8080",
});

export default api;