// src/components/AdminAuth.jsx
import React, { useState } from 'react';
import { login, signup } from '../api'; // Importing from api.js
import './AdminAuth.css'; // Add CSS for styling

const AdminAuth = ({ onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Admin',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            if (isLogin) {
                const response = await login({
                    email: formData.email,
                    password: formData.password,
                });
                if (response.data.success) {
                    onLogin();
                    onClose();
                }
                setSuccess(response.data.message);
            } else {
                const response = await signup(formData);
                setSuccess(response.data.message);
                // Optional: Automatically log in after sign up
                setIsLogin(true);
            }
        } catch (error) {
            setError(error.response?.data?.error || error.message);
        }
    };

    return (
        <div className="admin-auth-container">
            <h2>{isLogin ? 'Admin Login' : 'Admin Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={!isLogin}
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                )}
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default AdminAuth;
