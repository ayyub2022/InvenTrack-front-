import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let response;

      if (isLogin) {
        response = await axios.post(
          'http://localhost:5555/login',
          { email: formData.email, password: formData.password },
          {
            withCredentials: true, // Ensures cookies are sent and stored
          }
        );
      } else {
        response = await axios.post(
          'http://localhost:5555/signup',
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          },
          {
            withCredentials: true,
          }
        );
      }

      // Handle success
      setSuccess(response.data.message);
      setError('');
    } catch (error) {
      // Handle error
      setSuccess('');
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group mb-4">
              <label htmlFor="role" className="block text-gray-700 mb-2">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-500 text-center mb-4">
            {success === "Login successful" ? (
              <>
                <Navigate to="/" />
                {setIsAuthenticated(true)}
              </>
            ) : (
              success
            )}
          </div>}
        </form>
        <div className="flex justify-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Already have an account? Sign Up' : 'Switch to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;