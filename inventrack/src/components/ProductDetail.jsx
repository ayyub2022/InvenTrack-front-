import React, { useState, useEffect } from 'react';
import './ProductDetail.css'; // Assuming you have a CSS file for styling
import { useParams } from 'react-router-dom';
import { getProduct } from '../api';

const ProductDetail = ({ onClose, addToCart }) => {
    const [product, setProduct] = useState(null);
    const { productId } = useParams(); // Destructure id from useParams

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

    // Fix the addToCart call to pass the product as an argument
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="product-details">
            <button className="close-details" onClick={onClose}>X</button>
            <h3>{product.name}</h3>
            <p>Price: {product.sp}</p>
            <p>Category ID: {product.category_id}</p> {/* Corrected */}
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
        </div>
    );
};

export default ProductDetail;
