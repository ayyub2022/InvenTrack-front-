import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <Link to="/admin/supplyrequests">Supply requests</Link>
            <Link to="/admin/inventoryreport">Inventory report</Link>
            <Link to="/admin/paymentstatus">Payment Status</Link>
        </div>
    );
};

export default AdminDashboard;