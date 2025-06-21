import axios from 'axios';
import toast from 'react-hot-toast'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL ||'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})


axiosInstance.interceptors.request.use(
    (config) => {
        // Add any request interceptors here if needed
        // For example, you can add an Authorization header if a token is available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Show error toast if response got error
        const message =
            error.response?.data?.message ||
            error.message ||
            'Response error';
        toast.error(message);
        return Promise.reject(error);
    }
);


export default axiosInstance;