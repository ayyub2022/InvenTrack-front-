// src/components/Admin/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add logout functionality here
        navigate('/settings');
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Add additional admin functionalities here */}
        </div>
    );
};

export default AdminDashboard;
