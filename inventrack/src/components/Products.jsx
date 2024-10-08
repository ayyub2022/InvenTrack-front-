import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchProducts, fetchCategories } from '../api';
import ProductDetails from './ProductDetail';
import { useNavigate } from 'react-router-dom';

const placeholderImage = 'https://via.placeholder.com/150';

const Product = () => {
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
        image: '',
        image_file: null  
    });
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetchProducts();
                setProducts(productsResponse.data);

                const categoriesResponse = await fetchCategories();
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error('Error details:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = async (e) => {
        setSelectedCategory(e.target.value);
        try {
            const response = await axios.get(`https://inventrack-ovku.onrender.com/categories/${e.target.value}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products by category:', error);
            console.error('Error details:', error.response ? error.response.data : error.message);
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
                const imageResponse = await axios.post('https://inventrack-ovku.onrender.com/upload_image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                imageUrl = imageResponse.data.image_url;
                console.log('Uploaded image URL:', imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                console.error('Error details:', error.response ? error.response.data : error.message);
                return;
            }
        }

        try {
            const response = await axios.post('https://inventrack-ovku.onrender.com/create_product', {
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
            console.error('Error details:', error.response ? error.response.data : error.message);
        }
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        navigate(`/products/${product.id}`);
    };

    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="product-container">
            <h2>Products</h2>
            <div className="filter-section">
                <label htmlFor="category">Category:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
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
                        <div
                            key={product.id}
                            className="bg-white shadow rounded p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            onClick={() => handleProductClick(product)}
                        >
                            <img
                                src={product.image || placeholderImage}
                                alt={product.name}
                                className="w-full h-auto max-h-48 object-contain rounded"
                            />
                            <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
                            <p className="text-lg text-gray-600">${parseFloat(product.sp).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            {selectedProduct && (
                <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />
            )}
        </div>
    );
};

export default Product;
