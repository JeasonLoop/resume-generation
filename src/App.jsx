import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import useAuthStore from './store/useAuthStore';
import InteractiveParticles from './components/InteractiveParticles';
import LoadingScreen from './components/LoadingScreen';
import About from './pages/About';
import ErrorBoundary from './components/common/ErrorBoundary';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <LoadingScreen fullScreen={true} text="INITIALIZING" />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

function App() {
  const { fetchUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ErrorBoundary>
      <Router>
        <InteractiveParticles />
        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/editor/:id" element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <About />
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
