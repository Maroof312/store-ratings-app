import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Stores from './pages/Stores';
import Dashboard from './pages/Dashboard';
import './App.css';

// Set base URL for API calls
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password, address) => {
    try {
      await axios.post('/api/auth/register', { name, email, password, address });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <Router>
      <Header user={user} logout={logout} />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={
            !user ? <Login login={login} /> : <Navigate to="/dashboard" />
          } />
          <Route path="/register" element={
            !user ? <Register register={register} /> : <Navigate to="/dashboard" />
          } />
          <Route path="/stores" element={<Stores user={user} />} />
          <Route path="/dashboard" element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" />
          } />
          <Route path="/" element={
            <Navigate to={user ? "/dashboard" : "/login"} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;