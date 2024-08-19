import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css'; // Importing CSS file for styling
import { getProduct } from '../api';

const ProductDetail = ({ addToCart }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showNotification, setShowNotification] = useState(false);
    const { productId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category_id: '',
        bp: '',
        sp: '',
        image: '',  // Change from image_url to image
        image_file: null
    });
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProduct(productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [productId]);

    const handleCategoryChange = async (e) => {
        setSelectedCategory(e.target.value);
        try {
            const response = await axios.get(`http://127.0.0.1:5555/categories/${e.target.value}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setNewProduct(prevState => ({
            ...prevState,
            image_file: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = newProduct.image;

        if (newProduct.image_file) {
            const formData = new FormData();
            formData.append('file', newProduct.image_file);
            try {
                const imageResponse = await axios.post('http://127.0.0.1:5555/upload_image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                imageUrl = imageResponse.data.image_url;
                console.log('Uploaded image URL:', imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

        try {
            const response = await axios.post('http://127.0.0.1:5555/create_product', {
                ...newProduct,
                image: imageUrl
            });
            setProducts(prevProducts => [...prevProducts, response.data]);
            setNewProduct({
                name: '',
                category_id: '',
                bp: '',
                sp: '',
                image: '',
                image_file: null
            });
            setIsFormVisible(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    if (!product) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className='product-detail-container'>
            <div className="product-details">
                <button className="close-details" onClick={() => navigate('/products')} aria-label="Close">X</button>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} className="product-image" />
                <p>Price: ${product.sp.toFixed(2)}</p>
                <p>Buying Price: ${product.bp.toFixed(2)}</p>
                <div className="quantity-controls">
                    <button onClick={handleDecreaseQuantity} aria-label="Decrease quantity">-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncreaseQuantity} aria-label="Increase quantity">+</button>
                </div>
                <button onClick={handleAddToCart} className="add-to-cart-btn" aria-label="Add to cart">Add to Cart</button>
            </div>
            <button className="add-product-btn" onClick={() => setIsFormVisible(!isFormVisible)}>
                Add Product
            </button>
            {isFormVisible && (
                <form className="add-product-form" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Category:
                        <select
                            name="category_id"
                            value={newProduct.category_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Buying Price:
                        <input
                            type="number"
                            name="bp"
                            value={newProduct.bp}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Selling Price:
                        <input
                            type="number"
                            name="sp"
                            value={newProduct.sp}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Image URL:
                        <input
                            type="text"
                            name="image"
                            value={newProduct.image}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Or choose file:
                        <input
                            type="file"
                            name="image_file"
                            onChange={handleFileChange}
                        />
                    </label>
                    <button type="submit">Add Product</button>
                </form>
            )}
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
                            <h3>{product.name}</h3>
                            <p>Price: {product.sp}</p>
                            <p>Category ID: {product.category_id}</p>
                            <img
                                src={product.image || placeholderImage}
                                alt={product.name}
                                className="product-image"
                                onError={(e) => e.target.src = placeholderImage}
                            />
                        </div>


                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
