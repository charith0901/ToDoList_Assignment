import axiosInstance from "../utils/axiosInst";
import useAuthStore from "../store/authStore";

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/auth/register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  const { user, setUser } = useAuthStore();
  if (!user && localStorage.getItem('token')) {
    try {
      const response = await axiosInstance.get('/api/auth/me');
      const user = response.data;
      if (response.status !== 200) {
        throw new Error('Failed to fetch current user');
      }
      setUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
  return user;
};
