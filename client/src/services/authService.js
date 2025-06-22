import axiosInstance from "../utils/axiosInst";
import useAuthStore from "../store/authStore";

export const register = async (userData) => {
  const loginUser = useAuthStore.getState().login;
  try {
    const response = await axiosInstance.post('/api/auth/register', userData);
    if (response.data) {
      loginUser(response.data.user, response.data.token);
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  const loginUser = useAuthStore.getState().login;
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    if (response.data) {
      loginUser(response.data.user, response.data.token);
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  const logout = useAuthStore.getState().logout;
  logout();
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  const { user } = useAuthStore();
  const setUser = useAuthStore.getState((state) => state.login);
  if (!user && localStorage.getItem('token')) {
    try {
      const response = await axiosInstance.get('/api/auth/me');
      const user = response.data.user;
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

export const forgetPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/api/auth/forget-password', { email });
    return response.data;
  } catch (error) {
    console.error('Forget password error:', error);
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axiosInstance.post(`/api/auth/reset-password/${token}`, { password: newPassword });
    return response.data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};
