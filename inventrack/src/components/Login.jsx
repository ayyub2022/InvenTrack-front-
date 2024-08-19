
 import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Navigate} from 'react-router-dom';

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
  const navigate = useNavigate(); // Initialize useNavigate hook

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
          { withCredentials: true }
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
          { withCredentials: true }
        );
      }

      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle redirection and authentication state change
  useEffect(() => {
    if (success === "Login successful") {
      setIsAuthenticated(true);
      navigate('/'); // Redirect to home or any other route
    }
  }, [success, setIsAuthenticated, navigate]);

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
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success==="Login successful"?<>
          <Navigate to={'/'}/>
          {setIsAuthenticated(true)}
          </>:<></>}</div>}
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}

        </button>
      </div>
    </div>
  );
};

export default Login;
