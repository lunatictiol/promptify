import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
import PageTransitionWatcher from './components/PageTransitionWatcher';
import PageTransitionOverlay from './components/PageTransitionOverlay';
import useUIStore from './store/uiStore';
import LearnMore from './pages/LearnMore';
import { ToastContainer } from 'react-toastify';
import TaglineGenerator from './pages/Tagline';
import Article from './pages/Article';
import Resume from './pages/Resume';
import AuthRoute from './components/AuthRoutes';
export default function App() {
  const { isTransitioning } = useUIStore();
  return (
    <Router>
      <ToastContainer position='bottom-center' />
      <Navbar />
      <PageTransitionWatcher />
      {isTransitioning ? <PageTransitionOverlay /> :
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={
            <AuthRoute>
            <Login />
            </AuthRoute>
            } />
          <Route path="/register" element={
            <AuthRoute>
            <Register />
            </AuthRoute>
            } />
          <Route path='/learnmore' element={<LearnMore />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route path='/tagline' element={
            <ProtectedRoutes>
              <TaglineGenerator />
            </ProtectedRoutes>

          } />
          <Route path='/article' element={
            <ProtectedRoutes>
              <Article />
            </ProtectedRoutes>
          } />
          <Route
            path="/resume"
            element={
              <ProtectedRoutes>
               <Resume/>
              </ProtectedRoutes>
            }
          />
        </Routes>
        
      }
    </Router>
  );
}
