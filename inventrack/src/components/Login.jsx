import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      if (response.data.message) {
        // Handle success (e.g., redirect or show a success message)
      }
      data = await response.json()
      sessionStorage.setItem('User',data)
    } catch (error) {
      setError(error.response.data.error || 'An error occurred during Login.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
   
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
