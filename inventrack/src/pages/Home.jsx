import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Home.css'; // Import the CSS file

const Home = () => {
    const [topSellingProduct, setTopSellingProduct] = useState(null);
    const [bestSellerLast7Days, setBestSellerLast7Days] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [totalSaleReturn, setTotalSaleReturn] = useState(null);
    const [totalPurchase, setTotalPurchase] = useState(null);
    const [totalIncome, setTotalIncome] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topSellingProductResponse = await axios.get("http://127.0.0.1:5555/top_selling_product");
                setTopSellingProduct(topSellingProductResponse.data);
                const bestSellerLast7DaysResponse = await axios.get("http://127.0.0.1:5555/best_seller_last_7_days");
                setBestSellerLast7Days(bestSellerLast7DaysResponse.data);
                const totalRevenueResponse = await axios.get("/total_revenue");
                setTotalRevenue(totalRevenueResponse.data);
                const totalSaleReturnResponse = await axios.get("http://127.0.0.1:5555/total_sale_return");
                setTotalSaleReturn(totalSaleReturnResponse.data);
                const totalPurchaseResponse = await axios.get("/total_purchase");
                setTotalPurchase(totalPurchaseResponse.data);
                const totalIncomeResponse = await axios.get('/total_income');
                setTotalIncome(totalIncomeResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home-container">
            <div className="card">
                <h2>Top Selling Product</h2>
                {topSellingProduct ? <p>{topSellingProduct.product}: {topSellingProduct.total_quantity}</p> : <p>Loading...</p>}
            </div>
            <div className="card">
                <h2>Best Seller from Last 7 Days</h2>
                {bestSellerLast7Days ? <p>{bestSellerLast7Days.product}: {bestSellerLast7Days.total_quantity}</p> : <p>Loading...</p>}
            </div>
            <div className="card">
                <h2>Total Revenue</h2>
                {totalRevenue ? <p>${totalRevenue.total_revenue}</p> : <p>Loading...</p>}
            </div>
            <div className="card">
                <h2>Total Sale Return</h2>
                {totalSaleReturn ? <p>${totalSaleReturn.total_sale_return}</p> : <p>Loading...</p>}
            </div>
            <div className="card">
                <h2>Total Purchase</h2>
                {totalPurchase ? <p>${totalPurchase.total_purchase}</p> : <p>Loading...</p>}
            </div>
            <div className="card">
                <h2>Total Income</h2>
                {totalIncome ? <p>${totalIncome.total_income}</p> : <p>Loading...</p>}
            </div>
        </div>
    );
};

export default Home;
 