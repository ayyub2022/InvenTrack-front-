import React, { useState } from 'react';
import { signup, login } from '../../api/api';

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const response = await signup(formData);
        console.log('Admin signed up:', response.data);
        // handle successful signup
      } else {
        const response = await login(formData);
        console.log('Admin logged in:', response.data);
        // handle successful login
      }
    } catch (error) {
      console.error(`${isSignup ? 'Signup' : 'Login'} failed:`, error);
      // handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>{isSignup ? 'Admin Signup' : 'Admin Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      <p onClick={toggleForm} style={{ cursor: 'pointer', color: 'blue' }}>
        {isSignup ? 'Already have an account? Login here' : 'Don’t have an account? Signup here'}
      </p>
    </div>
  );
};

export default AuthForm;
