import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentsList = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('/payment');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div>
            <h2>Payments</h2>
            <ul>
                {payments.map(payment => (
                    <li key={payment.id}>
                        Inventory ID: {payment.inventory_id} - Amount: ${payment.amount} - Date: {payment.payment_date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentsList;
