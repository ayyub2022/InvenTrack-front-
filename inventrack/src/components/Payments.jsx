import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axios.get('/api/payments')
            .then(response => setPayments(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handlePaymentStatusChange = (id) => {
        // Handle status change to paid
        axios.put(`/api/payments/${id}`, { status: 'Paid' })
            .then(response => {
                setPayments(payments.map(payment =>
                    payment.id === id ? { ...payment, status: 'Paid' } : payment
                ));
            })
            .catch(error => console.error('Error updating payment status:', error));
    };

    return (
        <div className="payments-container">
            <h1>Payment Status</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id}>
                            <td>{payment.product}</td>
                            <td>{payment.quantity}</td>
                            <td>{payment.status}</td>
                            <td>
                                {payment.status !== 'Paid' && (
                                    <button onClick={() => handlePaymentStatusChange(payment.id)}>
                                        Mark as Paid
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Payments;
