// src/api/api.jsx
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5555'; 

export const getTopSellingProduct = () => axios.get(`${API_URL}/top_selling_product`);
export const getBestSellerLast7Days = () => axios.get(`${API_URL}/best_seller_last_7_days`);
export const getTotalRevenue = () => axios.get('/total_revenue');
export const getTotalSaleReturn = () => axios.get('/total_sale_return');
export const getTotalPurchase = () => axios.get('/total_purchase');
export const getTotalIncome = () => axios.get('/total_income');
