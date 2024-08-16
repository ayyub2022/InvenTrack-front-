import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Cart.css';

const Cart = ({ cart }) => {
    const [cartItems, setCartItems] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const handlePaymentMethodChange = (e) => {
        setShowPaymentForm(e.target.value === 'mpesa');
    };

    const handleCheckout = async () => {
        try {
            const response = await axios.post('/mpesa_payment', {
                phone_number: phoneNumber,
                amount: cartItems.reduce((total, item) => total + item.sp, 0),
                user_id: 1 // Replace with actual user ID
            });

            setPaymentResponse(response.data);

            // Redirect or show a success message
            if (response.data.CheckoutRequestID) {
                navigate('/success'); // Assuming you have a success page
            } else {
                console.error('Failed to initiate M-Pesa payment:', response.data);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <p>{item.name}</p>
                            <p>Price: {item.sp}</p>
                        </div>
                    ))
                ) : (
                    <p>No items in cart.</p>
                )}
            </div>
            <div className="payment-section">
                <label htmlFor="payment-method">Payment Method:</label>
                <select id="payment-method" onChange={handlePaymentMethodChange}>
                    <option value="">Select Payment Method</option>
                    <option value="mpesa">M-Pesa</option>
                </select>
                {showPaymentForm && (
                    <div>
                        <label htmlFor="phone-number">M-Pesa Phone Number:</label>
                        <input
                            type="text"
                            id="phone-number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            placeholder="Enter your phone number"
                        />
                        <button onClick={handleCheckout}>Checkout with M-Pesa</button>
                    </div>
                )}
                {paymentResponse && (
                    <div className="payment-response">
                        <h3>Payment Response</h3>
                        <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
