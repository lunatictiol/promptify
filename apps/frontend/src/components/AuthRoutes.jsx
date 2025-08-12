import { Navigate } from 'react-router';
import useAuthStore from '../store/authStore';

export default function AuthRoute({ children }) {
  const { accessToken } = useAuthStore();
  return accessToken ? <Navigate to="/dashboard" replace /> : children;
}
