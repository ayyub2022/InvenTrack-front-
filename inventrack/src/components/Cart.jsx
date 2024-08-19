import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, initiateMpesaPayment } from '../api'; // Ensure this path is correct
import './Cart.css'; // Importing CSS file for any additional styles

const Cart = ({ cart, updateCart }) => {
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
            const userProfileResponse = await getUserProfile();
            const userId = userProfileResponse.data.id; // Adjust based on actual response

            const response = await initiateMpesaPayment({
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

    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                <h2 className="font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart</h2>

                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 gap-y-4">
                            <div className="col-span-12 lg:col-span-2">
                                <img src={item.image} alt={item.name} className="w-full lg:w-[180px] rounded-lg" />
                            </div>
                            <div className="col-span-12 lg:col-span-10 w-full lg:pl-3">
                                <div className="flex items-center justify-between mb-4">
                                    <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">{item.name}</h5>
                                    <button
                                        onClick={() => handleRemoveFromCart(item)}
                                        className="rounded-full flex items-center justify-center focus:outline-none"
                                    >
                                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400" cx="17" cy="17" r="17" />
                                            <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white" d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-base leading-7 text-gray-500 mb-6">
                                    {item.description} <a href="javascript:;" className="text-indigo-600">More....</a>
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <button className="group rounded-[50px] border border-gray-200 shadow-sm p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:bg-gray-50 hover:border-gray-300">
                                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.5 9.5H13.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                        <input type="text" className="border border-gray-200 rounded-full w-10 text-center py-1.5 px-3 bg-gray-100 text-gray-900 font-semibold text-sm" placeholder="2" />
                                        <button className="group rounded-[50px] border border-gray-200 shadow-sm p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:bg-gray-50 hover:border-gray-300">
                                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.75 9.5H14.25M9 14.75V4.25" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">${item.sp.toFixed(2)}</h6>
                                </div>
                            </div>
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