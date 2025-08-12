import { Navigate } from 'react-router';
import useAuthStore from '../store/authStore';

export default function ProtectedRoute({ children }) {
  const { accessToken } = useAuthStore();
  return accessToken ? children : <Navigate to="/login" replace />;
}
