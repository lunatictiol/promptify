// src/store/uiStore.js
import { create } from 'zustand';

const useUIStore = create((set) => ({
  isTransitioning: false,
  startTransition: () => set({ isTransitioning: true }),
  endTransition: () => set({ isTransitioning: false }),
}));

export default useUIStore;
