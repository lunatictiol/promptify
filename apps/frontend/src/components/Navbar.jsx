import { Link } from 'react-router';
import useAuthStore from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
     {!user?
         <Link to="/" className="font-bold text-lg">Promptify</Link>
         :
         <Link to="/dashboard" className="font-bold text-lg">Promptify</Link>
    }
        
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <button onClick={logout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
