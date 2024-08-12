import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = ({cart}) => {
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isCheckout, setIsCheckout] = useState(false);
    const navigate = useNavigate();

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    useEffect(()=>{
        setCartItems(cart);
    },[cart])
    const handleCheckout = async () => {
        // Example: POST request to /checkout endpoint
        try {
            await axios.post('http://127.0.0.1:5555/checkout', { cartItems, paymentMethod });
            setCartItems([]); // Clear cart after successful checkout
            navigate('/orders');
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
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
