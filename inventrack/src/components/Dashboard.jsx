import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import SupplyRequests from './SupplyRequests';
import Clerks from './Clerks';
import Payments from './PaymentsAdmin';
import Admins from './Admins';
// import './Dashboard.css';

const Dashboard = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Overall Store Performance',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const barData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Product Performance',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255,99,132,0.2)',
          'rgba(54,162,235,0.2)',
          'rgba(255,206,86,0.2)',
          'rgba(75,192,192,0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54,162,235,1)',
          'rgba(255,206,86,1)',
          'rgba(75,192,192,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="table-container">
        <SupplyRequests />
      </div>
      <div className="table-container">
        <Clerks />
        <button className="add-button">Add New Clerk</button>
      </div>
      <div className="table-container">
        <Payments />
      </div>
      <div className="table-container">
        <Admins />
        <button className="add-button">Add New Admin</button>
      </div>
      <div className="chart-container">
        <h2>Overall Store Performance</h2>
        <Line data={lineData} />
      </div>
      <div className="chart-container">
        <h2>Product Performance</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Dashboard;
