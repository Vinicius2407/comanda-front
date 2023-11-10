import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb21hbmRhZ28iLCJzdWIiOiJqamoiLCJleHAiOjE2OTk2Njc3NDV9.bRrzfLF5rf5xQFkhT11RQBUMgQO9tyHBsUTEMLCOug0'
const api = axios.create({

    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`
    },
    baseURL: "http://10.0.2.2:8080",
});

export default api;