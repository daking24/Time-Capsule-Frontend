import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import ShuttleLoader from './components/ShuttleLoader';
import Home from './pages/Home';
import Compose from './pages/Compose';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
      return (
        <div className="min-h-screen bg-royal-gradient flex items-center justify-center">
            <ShuttleLoader />
        </div>
      );
  }
  
  if (!user) {
      return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <Routes>
        {/* Public Routes */}
        <Route 
            path="/login" 
            element={!user ? <div className="min-h-screen bg-royal-gradient flex items-center justify-center p-4"><Login switchToRegister={() => navigate('/register')} /></div> : <Navigate to="/" />} 
        />
        <Route 
            path="/register" 
            element={!user ? <div className="min-h-screen bg-royal-gradient flex items-center justify-center p-4"><Register switchToLogin={() => navigate('/login')} /></div> : <Navigate to="/" />} 
        />

        {/* Root Route: Landing Page (Public) vs Home (Protected) */}
        <Route 
            path="/" 
            element={
                user ? (
                    <Layout>
                        <Home />
                    </Layout>
                ) : (
                    <LandingPage onEnter={() => navigate('/login')} />
                )
            } 
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            {/* Home is now handled above at / */}
            <Route path="/compose" element={<Compose />} />
            <Route path="/dashboard" element={<Dashboard onBack={() => navigate('/')} />} />
            <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
