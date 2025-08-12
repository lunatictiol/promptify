import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  // Load from localStorage when app starts
  initAuth: () => {
    const storedUser = localStorage.getItem('user');
    const storedAccess = localStorage.getItem('accessToken');
    const storedRefresh = localStorage.getItem('refreshToken');

    set({
      user: storedUser ? JSON.parse(storedUser) : null,
      accessToken: storedAccess || null,
      refreshToken: storedRefresh || null,
    });
  },

  // Save tokens & user
  setAuth: ({ user, accessToken, refreshToken }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    set({ user, accessToken, refreshToken });
  },

  // Clear everything
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    set({ user: null, accessToken: null, refreshToken: null });
  },
}));

export default useAuthStore;
