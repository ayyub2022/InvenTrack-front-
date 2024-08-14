import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(
        'http://localhost:5555/login',
        { email, password },
        {
          withCredentials: true, // This ensures cookies are sent and stored
        }
      );

      console.log(response.data); // Expect this to confirm successful login
      navigate("/profile"); // Redirect to profile after successful login
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
