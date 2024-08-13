import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Home.css'; 

const Home = () => {
    
    const [bestSellerLast7Days, setBestSellerLast7Days] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [totalSaleReturn, setTotalSaleReturn] = useState(null);
    const [totalPurchase, setTotalPurchase] = useState(null);
    const [totalIncome, setTotalIncome] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
               
                const bestSellerLast7DaysResponse = await axios.get("http://127.0.0.1:5555/best_seller_last_7_days");
                setBestSellerLast7Days(bestSellerLast7DaysResponse.data);
                const totalRevenueResponse = await axios.get("http://127.0.0.1:5555/total_revenue");
                setTotalRevenue(totalRevenueResponse.data);
                const totalSaleReturnResponse = await axios.get("http://127.0.0.1:5555/total_sale_return");
                setTotalSaleReturn(totalSaleReturnResponse.data);
                const totalPurchaseResponse = await axios.get("http://127.0.0.1:5555/total_purchase");
                setTotalPurchase(totalPurchaseResponse.data);
                const totalIncomeResponse = await axios.get("http://127.0.0.1:5555/total_income");
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
                <h2>Best Seller from Last 7 Days</h2>
                {bestSellerLast7Days ? <p>{bestSellerLast7Days.product}: {bestSellerLast7Days.total_quantity}</p> : <p>Loading...</p>}
                   <img
            src="https://www.shutterstock.com/image-vector/online-shop-top-seller-line-260nw-1930335566.jpg"
            alt="Best Seller"
          />
            </div>
            <div className="card">
                <h2>Total Revenue</h2>
                {totalRevenue ? <p>${totalRevenue.total_revenue}</p> : <p>Loading...</p>}
                 <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKICpTW38tzuB8fgrAkWS4KpwQF4qSQpBr9Q&s"
            alt="Revenue Earned"
          />
            </div>
            <div className="card">
                <h2>Total Sale Return</h2>
                {totalSaleReturn ? <p>${totalSaleReturn.total_sale_return}</p> : <p>Loading...</p>}
                <img
            src="https://static.thenounproject.com/png/1065351-200.png"
            alt="Total sale return"
          />
            </div>
            <div className="card">
                <h2>Total Purchase</h2>
                {totalPurchase ? <p>${totalPurchase.total_purchase}</p> : <p>Loading...</p>}
            </div>
            <div className="card">
                <h2>Total Income</h2>
                {totalIncome ? <p>${totalIncome.total_income}</p> : <p>Loading...</p>}
                <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/total-income-3395521-2825847.png"
            alt="Income Earned"
          />
            </div>

        </div>
    );
};

export default Home;
 