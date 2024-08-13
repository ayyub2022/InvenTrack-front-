import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Elements, loadStripe } from '@stripe/react-stripe-js';

import PaymentForm from './PaymentForm'; // Adjust the path if necessary
import './Cart.css';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51Pmw95GT6iUcowpzzdPO54XZeBS8YW8SP8pshMhB4kQJqpfHLicxEQLXVB9mieKhEQO6isZoQV2DfyryaewiYx2L00Y1fzZ0ns');

const Cart = ({ cart }) => {
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        setShowPaymentForm(e.target.value === 'credit_card');
    };

    const handleCheckout = async () => {
        if (paymentMethod === 'credit_card') {
            return; // PaymentForm will handle checkout
        }

        try {
            const response = await axios.post('/create_payment', {
                user_id: 1, // Replace with actual user ID
                property_id: 1, // Replace with actual property ID
                amount: cartItems.reduce((total, item) => total + item.sp, 0),
                payment_method: paymentMethod
            });

            if (response.data.status === 'success') {
                // Redirect or show success message
                navigate('/success');
            } else {
                // Handle errors
                console.error(response.data.message);
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
                <select id="payment-method" value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="">Select Payment Method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="mpesa">M-Pesa</option>
                </select>
                {showPaymentForm && (
                    <Elements stripe={stripePromise}>
                        <PaymentForm
                            amount={cartItems.reduce((total, item) => total + item.sp, 0)}
                            propertyId={1} 
                            userId={1} 
                        />
                    </Elements>
                )}
                {!showPaymentForm && <button onClick={handleCheckout}>Checkout</button>}
            </div>
        </div>
    );
};

export default Cart;
