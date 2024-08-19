// src/components/Admin/PaymentStatus.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getPaymentStatus } from '../../api'; // Corrected import path
import './PaymentStatus.css'; // Ensure this file exists or remove if not used

const PaymentStatus = () => {
  const [status, setStatus] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await getPaymentStatus(); // Use the imported API function
        setStatus(response.data);
      } catch (error) {
        console.error('Error fetching payment status:', error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="payment-status">
      <h1>Payment Status</h1>
      
      {/* Button to go back to the Admin Dashboard */}
      <button className="go-back-btn" onClick={() => navigate('/admin/dashboard')}>
        Go Back to Admin Dashboard
      </button>

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Spoilt Quantity</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {status.length > 0 ? (
            status.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product_id}</td>
                <td>{item.quantity}</td>
                <td>{item.spoilt_quantity}</td>
                <td>{item.payment_status}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No payment status found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentStatus;
