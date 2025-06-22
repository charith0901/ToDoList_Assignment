import axiosInstance from "../utils/axiosInst";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";

export const register = async (userData) => {
  await toast.promise(
    async () => {
      const loginUser = useAuthStore.getState().login;
        const response = await axiosInstance.post('/api/auth/register', userData);
        if (response.data) {
          loginUser(response.data.user, response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        return response.data;
    },
    {
      loading: "Registering...",
      success: "Registration successful!",
      error: (err) => `Error registering: ${err.response?.data?.message || err.message}`
    }
  );
};

export const login = async (credentials) => {
  const loginUser = useAuthStore.getState().login;
  await toast.promise(
    async () => {
      const response = await axiosInstance.post('/api/auth/login', credentials);
      if (response.data) {
        loginUser(response.data.user, response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response.data;
    },
    {
      loading: "Logging in...",
      success: "Login successful!",
      error: (err) => `Error logging in: ${err.response?.data?.message || err.message}`
    }
  );
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
  await toast.promise(
    async () => {
      const response = await axiosInstance.post('/api/auth/forget-password', { email });
      return response.data;
    },
    {
      loading: "Sending reset link...",
      success: "Reset link sent to your email!",
      error: (err) => `Error sending reset link: ${err.response?.data?.message || err.message}`
    }
  );
};

export const resetPassword = async (token, newPassword) => {
  await toast.promise(
    async () => {
      const response = await axiosInstance.post(`/api/auth/reset-password/${token}`, { password: newPassword });
      return response.data;
    },
    {
      loading: "Resetting password...",
      success: "Password reset successfully!",
      error: (err) => `Error resetting password: ${err.response?.data?.message || err.message}`
    }
  );
};

export const updatePassword = async (currentPassword, newPassword) => {
  await toast.promise(
    async () => {
      const response = await axiosInstance.put('/api/auth/update-password', { currentPassword, newPassword });
      return response.data;
    },
    {
      loading: "Updating password...",
      success: "Password updated successfully!",
      error: (err) => `Error updating password: ${err.response?.data?.message || err.message}`
    }
  );
};
