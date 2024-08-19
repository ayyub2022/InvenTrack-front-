import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { getProduct } from '../api';

const ProductDetail = ({ addToCart, isAddedToCart, isLoggedIn }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showNotification, setShowNotification] = useState(false);
    const [error, setError] = useState('');
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProduct(productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product details');
            }
        };

        fetchData();
    }, [productId]);

    const handleAddToCart = () => {
        if (isLoggedIn) {
            console.log('Product to add:', { ...product, quantity });
            addToCart({ ...product, quantity });
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } else {
            setShowLoginPrompt(true);
        }
    };

    const handleIncreaseQuantity = () => setQuantity(quantity + 1);
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleClose = () => {
        navigate('/products');
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!product) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className='product-detail-container'>
            <div className="product-details">
                <button className="close-details" onClick={handleClose} aria-label="Close">X</button>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} className="product-image" />
                <p>Price: ${product.sp.toFixed(2)}</p>
                <p>Category ID: {product.category_id}</p>
                <p>Buying Price: ${product.bp.toFixed(2)}</p>
                <div className="quantity-controls">
                    <button onClick={handleDecreaseQuantity} aria-label="Decrease quantity">-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncreaseQuantity} aria-label="Increase quantity">+</button>
                </div>
                <button onClick={handleAddToCart} className="add-to-cart-btn" aria-label="Add to cart">Add to Cart</button>
                {showNotification && <p className="added-to-cart-message">This product has been added to your cart.</p>}
                {showLoginPrompt && (
                    <div className="login-prompt">
                        <p>You need to be logged in to add items to the cart.</p>
                        <button onClick={handleLoginRedirect}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
