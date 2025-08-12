// src/components/PageTransitionWatcher.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import useUIStore from '../store/uiStore';

export default function PageTransitionWatcher() {
  const location = useLocation();
  const { startTransition, endTransition } = useUIStore();

  useEffect(() => {
    startTransition();
    const timer = setTimeout(() => {
      endTransition();
    }, 2000); 

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
