import React, { useState } from 'react';
import { login, signup } from '../api'; // Importing from api.js
import './settings.css'; // Assuming you have a CSS file for styling

// Importing other components
import Appearance from './Appearance';
import PaymentDetails from './PaymentDetails';
import ResetSettings from './ResetSettings';
import AboutInventrack from './AboutInventrack';
// import AdminPage from './AdminPage'; // You can remove this if not used
import AdminAuth from './AdminAuth';
import AdminHomePage from './AdminHomePage';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('login');
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'User',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAdminAuth, setShowAdminAuth] = useState(false);
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);

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
                setSuccess(response.data.message);
            } else {
                const response = await signup(formData);
                setSuccess(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.error || error.message);
        }
    };

    const handleAdminLogin = () => {
        setAdminLoggedIn(true);
        setShowAdminAuth(false);
    };

    const renderSection = () => {
        if (adminLoggedIn) {
            return <AdminHomePage />;
        }

        switch (activeSection) {
            case 'login':
                return (
                    <div className="login-signup-form">
                        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
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
                                        <option value="User">User</option>
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
            case 'appearance':
                return <Appearance />;
            case 'payment':
                return <PaymentDetails />;
            case 'reset':
                return <ResetSettings />;
            case 'about':
                return <AboutInventrack />;
            case 'admin':
                return showAdminAuth ? (
                    <AdminAuth onClose={() => setShowAdminAuth(false)} onLogin={handleAdminLogin} />
                ) : (
                    <div className="admin-auth-prompt">
                        <h2>Admin Page</h2>
                        <button onClick={() => setShowAdminAuth(true)}>Login as Admin</button>
                    </div>
                );
            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-buttons">
                <button onClick={() => setActiveSection('login')}>Login/Sign Up</button>
                <button onClick={() => setActiveSection('appearance')}>Appearance</button>
                <button onClick={() => setActiveSection('payment')}>Payment Details</button>
                <button onClick={() => setActiveSection('reset')}>Reset Settings</button>
                <button onClick={() => setActiveSection('about')}>About Inventrack</button>
                <button onClick={() => setActiveSection('admin')}>Admin Page</button>
            </div>
            <div className="settings-content">
                {renderSection()}
            </div>
        </div>
    );
};

export default Settings;
