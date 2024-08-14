// src/api/api.jsx
import axios from "axios";

const API_URL = "http://127.0.0.1:5555";

// Top Selling Products & Revenue
export const getTopSellingProduct = () =>
  axios.get(`${API_URL}/top_selling_product`);
export const getBestSellerLast7Days = () =>
  axios.get(`${API_URL}/best_seller_last_7_days`);
export const getTotalRevenue = () => axios.get(`${API_URL}/total_revenue`);
export const getTotalSaleReturn = () =>
  axios.get(`${API_URL}/total_sale_return`);
export const getTotalPurchase = () => axios.get(`${API_URL}/total_purchase`);
export const getTotalIncome = () => axios.get(`${API_URL}/total_income`);

// User Profile
export const getUserProfile = () =>
  axios.get(`${API_URL}/profile`, { withCredentials: true }); //this does not work

// Products
export const fetchProducts = () => axios.get(`${API_URL}/products`);
export const fetchCategories = () => axios.get(`${API_URL}/categories`);
export const getProduct = (productId) =>
  axios.get(`${API_URL}/product/${productId}`);
export const createProduct = (data) =>
  axios.post(`${API_URL}/create_product`, data);
export const updateProduct = (productId, data) =>
  axios.put(`${API_URL}/product/${productId}`, data);
export const deleteProduct = (productId) =>
  axios.delete(`${API_URL}/product/${productId}`);

// Categories
export const getCategories = () => axios.get(`${API_URL}/categories`);
export const getProductsByCategory = (categoryId) =>
  axios.get(`${API_URL}/categories/${categoryId}/products`);

// Sales Data
export const SalesChart = () => axios.get(`${API_URL}/sales_data`);

// Authentication
export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = ({email,password}) =>
  axios.post(`${API_URL}/login`, {email,password}, { withCredentials: true }); //this does not
export const logout = () => axios.post(`${API_URL}/logout`);
export const checkSession = () => axios.get(`${API_URL}/checksession`);

// User Management
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUser = (userId) => axios.get(`${API_URL}/users/${userId}`);
export const updateUser = (userId, data) =>
  axios.patch(`${API_URL}/users/${userId}`, data);
