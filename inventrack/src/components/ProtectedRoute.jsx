import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate()
  const isAuthenticated = async () => {
    try {
      const response = await axios.get('http://localhost:5555/checksession', { withCredentials: true });
      return response.status === 200;
    } catch (error) {
      navigate("/login")
    }
  };

  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
