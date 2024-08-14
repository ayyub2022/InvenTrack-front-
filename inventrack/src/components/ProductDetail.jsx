import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProductDetail.css'; // Importing CSS file for styling
import { getProduct } from '../api';

const ProductDetail = ({ addToCart, isAddedToCart }) => {
    const [product, setProduct] = useState(null);
    const { productId } = useParams(); // Destructure id from useParams
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProduct(productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchData();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>; // Optional: A loading state while fetching data
    }

    // Function to handle add to cart
    const handleAddToCart = () => {
        addToCart(product);
    };

    // Function to handle navigation back to products page
    const handleClose = () => {
        navigate('/products'); // Navigate to products page
    };

    return (
        <div className="product-details">
            <button className="close-details" onClick={handleClose}>X</button>
            <h3>{product.name}</h3>
            <p>Price: ${product.sp}</p>
            <p>Category ID: {product.category_id}</p> {/* Corrected */}
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            {isAddedToCart && <p className="added-to-cart-message">This product has been added to your cart.</p>}
        </div>
    );
};

export default ProductDetail;