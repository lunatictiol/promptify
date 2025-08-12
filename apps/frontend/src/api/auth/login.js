import axiosClient from '../apiClient';
import useAuthStore from '../../store/authStore';

export const login = async (credentials) => {
  const { data } = await axiosClient.post('/auth/login', credentials);
  
  useAuthStore.getState().setAuth({
    user: data.user || null,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return data;
};
