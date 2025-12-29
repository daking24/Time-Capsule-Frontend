import React, { createContext, useState, useEffect, useContext } from 'react';


const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
        if (token) {
            try {
                const response = await fetch(`${API_BASE}/api/users/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // Token might be expired
                    logout();
                }
            } catch (e) {
                console.error("Failed to fetch user", e);
                logout();
            }
        }
        setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${API_BASE}/api/auth/token`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    setToken(data.access_token);
    return true;
  };

  const register = async (email, password) => {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    setToken(data.access_token);
    return true;
  };

  const requestLoginCode = async (email) => {
    const response = await fetch(`${API_BASE}/api/auth/request-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to send code');
    }
    return true;
  };

  const verifyLoginCode = async (email, code) => {
    const response = await fetch(`${API_BASE}/api/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Invalid code');
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    setToken(data.access_token);
    return true;
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('app_view');
    localStorage.removeItem('has_entered');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, requestLoginCode, verifyLoginCode, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
