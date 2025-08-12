import axiosClient from '../apiClient';
import useAuthStore from '../../store/authStore';

export const register = async (formData) => {
  const { data } = await axiosClient.post('/auth/register', formData);

  useAuthStore.getState().setAuth({
    user: data.user || null,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return data;
};
