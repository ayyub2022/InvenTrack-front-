import React, { useState } from 'react';
import './AdminHomePage.css';
import Dashboard from './Dashboard';
import SupplyRequests from './SupplyRequests';
import Clerks from './Clerks';
import PaymentsAdmin from './PaymentsAdmin'; // Changed from Payments to PaymentsAdmin
import Admins from './Admins';

const AdminHomePage = () => {
    const [activePage, setActivePage] = useState('dashboard');

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard />;
            case 'supplyRequests':
                return <SupplyRequests />;
            case 'clerks':
                return <Clerks />;
            case 'payments':
                return <PaymentsAdmin />; // Changed from Payments to PaymentsAdmin
            case 'admins':
                return <Admins />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="admin-home-container">
            <nav className="admin-navbar">
                <ul>
                    <li>
                        <button
                            className={activePage === 'dashboard' ? 'active' : ''}
                            onClick={() => setActivePage('dashboard')}
                        >
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            className={activePage === 'supplyRequests' ? 'active' : ''}
                            onClick={() => setActivePage('supplyRequests')}
                        >
                            Supply Requests
                        </button>
                    </li>
                    <li>
                        <button
                            className={activePage === 'clerks' ? 'active' : ''}
                            onClick={() => setActivePage('clerks')}
                        >
                            Clerks
                        </button>
                    </li>
                    <li>
                        <button
                            className={activePage === 'payments' ? 'active' : ''}
                            onClick={() => setActivePage('payments')}
                        >
                            Payments
                        </button>
                    </li>
                    <li>
                        <button
                            className={activePage === 'admins' ? 'active' : ''}
                            onClick={() => setActivePage('admins')}
                        >
                            Admins
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="admin-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminHomePage;
