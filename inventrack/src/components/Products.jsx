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
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-4">Products</h2>
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <label htmlFor="category" className="mr-2">Category:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="border rounded p-2"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    Add Product
                </button>
            </div>
            {isFormVisible && (
                <form className="mb-6 p-4 border rounded" onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Category:
                        <select
                            name="category_id"
                            value={newProduct.category_id}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
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
                    <label className="block mb-2">
                        Buying Price:
                        <input
                            type="number"
                            name="bp"
                            value={newProduct.bp}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Selling Price:
                        <input
                            type="number"
                            name="sp"
                            value={newProduct.sp}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Image URL:
                        <input
                            type="text"
                            name="image"
                            value={newProduct.image}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </label>
                    <label className="block mb-2">
                        Or choose file:
                        <input
                            type="file"
                            name="image_file"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add Product
                    </button>
                </form>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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