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
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            originalRequest.url !== `${import.meta.env.VITE_API_URL}/auth/login`
        ) {
            originalRequest._retry = true;
            try {
                console.log("here we go");
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
                    {
                        headers: {
                            'Authorization': `Bearer ${refreshToken}`,
                        },
                    }
                );
                const { token, refreshToken: newRefreshToken } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', newRefreshToken);
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                toast.error("Session expired. Please log in again.");
                return Promise.reject(refreshError);
            }
        }
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