import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Cart.css';

const Cart = ({ cart }) => {
    const [cartItems, setCartItems] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const [paymentResponse, setPaymentResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const handlePaymentMethodChange = (e) => {
        setShowPaymentForm(e.target.value === 'mpesa');
    };

    const handleCheckout = async () => {
        setShowPopup(true); // Show popup
    };

    const handleConfirmCheckout = async () => {
        try {
            const response = await axios.post('/mpesa_payment', {
                phone_number: phoneNumber,
                amount: cartItems.reduce((total, item) => total + item.sp, 0),
                user_id: userId
            });

            setPaymentResponse(response.data);

            if (response.data.CheckoutRequestID) {
                navigate('/success'); // Redirect to success page
            } else {
                console.error('Failed to initiate M-Pesa payment:', response.data);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
        setShowPopup(false); // Hide popup
    };

    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item !== itemToRemove);
        setCartItems(updatedCart);
        updateCart(updatedCart);
    };

    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item !== itemToRemove);
        setCartItems(updatedCart);
        updateCart(updatedCart);
    };

    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                <h2 className="font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart</h2>

                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <p>{item.name}</p>
                            <p>Price: {item.sp}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No items in cart.</p>
                )}

                <div className="flex flex-col md:flex-row items-center justify-between lg:px-6 pb-6 border-b border-gray-200">
                    <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full text-center md:text-left mb-4 md:mb-0">Subtotal</h5>
                    <div className="flex items-center justify-between gap-5">
                        <button className="rounded-full py-2.5 px-3 bg-indigo-50 text-indigo-600 font-semibold text-xs whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">Promo Code?</button>
                        <h6 className="font-manrope font-bold text-3xl leading-10 text-indigo-600">${cartItems.reduce((total, item) => total + item.sp, 0).toFixed(2)}</h6>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <p className="text-base leading-7 text-gray-500 mb-5">Shipping taxes, and discounts calculated at checkout</p>
                    <button onClick={handleCheckout} className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700">Checkout</button>
                </div>
            </div>

            {/* Popup for payment method */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button onClick={() => setShowPopup(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
                        <div className="mb-4">
                            <label htmlFor="payment-method" className="block text-gray-700 mb-2">Payment Method</label>
                            <select id="payment-method" className="border border-gray-300 rounded-lg w-full p-2" onChange={handlePaymentMethodChange}>
                                <option value="none">Select</option>
                                <option value="mpesa">M-Pesa</option>
                            </select>
                        </div>
                        {showPaymentForm && (
                            <div className="mb-4">
                                <label htmlFor="phone-number" className="block text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone-number"
                                    className="border border-gray-300 rounded-lg w-full p-2"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        )}
                        <button onClick={handleConfirmCheckout} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Checkout with M-Pesa</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Cart;