// src/api/api.jsx
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5555'; 

export const getTopSellingProduct = () => axios.get(`${API_URL}/top_selling_product`);
export const getBestSellerLast7Days = () => axios.get(`${API_URL}/best_seller_last_7_days`);
export const getTotalRevenue = () => axios.get(`${API_URL}/total_revenue`);
export const getTotalSaleReturn = () => axios.get(`${API_URL}/total_sale_return`);
export const getTotalPurchase = () => axios.get(`${API_URL}/total_purchase`);
export const getTotalIncome = () => axios.get(`${API_URL}/total_income`);
export const SalesChart = ()=> axios.get(`${API_URL}/sales_data`)
export const profile = ()=> axios.get(`${API_URL}/user/profile`)
