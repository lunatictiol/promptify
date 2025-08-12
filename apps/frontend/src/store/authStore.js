import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: ({ user, accessToken, refreshToken }) =>
        set({
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'auth-storage',

    }
  )
);

export default useAuthStore;