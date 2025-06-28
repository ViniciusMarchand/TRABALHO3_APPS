import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const Axios = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 5000,
});

Axios.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            await AsyncStorage.removeItem('token'); 
        }
        return Promise.reject(error);
    }
);

