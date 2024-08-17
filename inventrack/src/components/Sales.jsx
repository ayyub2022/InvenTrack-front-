import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import ChartComponent from "./ChartComponent";
import ChartComponentPro from "./ChartComponentPro";

const Sales = () => {
  const [bestSellerLast7Days, setBestSellerLast7Days] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalSaleReturn, setTotalSaleReturn] = useState(null);
  const [totalPurchase, setTotalPurchase] = useState(null);
  const [totalIncome, setTotalIncome] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          bestSellerLast7DaysResponse,
          totalRevenueResponse,
          totalSaleReturnResponse,
          totalPurchaseResponse,
          totalIncomeResponse,
          productSalesResponse,
        ] = await Promise.all([
          axios.get("http://127.0.0.1:5555/best_seller_last_7_days"),
          axios.get("http://127.0.0.1:5555/total_revenue"),
          axios.get("http://127.0.0.1:5555/total_sale_return"),
          axios.get("http://127.0.0.1:5555/total_purchase"),
          axios.get("http://127.0.0.1:5555/total_income"),
          axios.get("http://127.0.0.1:5555/product_sales"),
        ]);

        setBestSellerLast7Days(bestSellerLast7DaysResponse.data);
        setTotalRevenue(totalRevenueResponse.data);
        setTotalSaleReturn(totalSaleReturnResponse.data);
        setTotalPurchase(totalPurchaseResponse.data);
        setTotalIncome(totalIncomeResponse.data);

        const productSalesData = productSalesResponse.data;
        const labels = productSalesData.map((item) => item.product);
        const quantities = productSalesData.map((item) => item.total_quantity);

        setChartData({
          labels,
          datasets: [
            {
              data: quantities,
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(231, 233, 237, 0.2)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(231, 233, 237, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <div className="card">
        <h2>Best Seller from Last 7 Days</h2>
        {bestSellerLast7Days ? (
          <p>
            {bestSellerLast7Days.product}: {bestSellerLast7Days.total_quantity}
          </p>
        ) : (
          <p>Loading...</p>
        )}
        <img
          src="https://www.shutterstock.com/image-vector/online-shop-top-seller-line-260nw-1930335566.jpg"
          alt="Best Seller"
        />
      </div>
      <div className="card">
        <h2>Total Revenue</h2>
        {totalRevenue ? (
          <p>${totalRevenue.total_revenue}</p>
        ) : (
          <p>Loading...</p>
        )}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKICpTW38tzuB8fgrAkWS4KpwQF4qSQpBr9Q&s"
          alt="Revenue Earned"
        />
      </div>
      <div className="card">
        <h2>Total Sale Return</h2>
        {totalSaleReturn ? (
          <p>${totalSaleReturn.total_sale_return}</p>
        ) : (
          <p>Loading...</p>
        )}
        <img
          src="https://static.thenounproject.com/png/1065351-200.png"
          alt="Total Sale Return"
        />
      </div>
      <div className="card">
        <h2>Total Purchase</h2>
        {totalPurchase ? (
          <p>${totalPurchase.total_purchase}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="card">
        <h2>Total Income</h2>
        {totalIncome ? (
          <p>${totalIncome.total_income}</p>
        ) : (
          <p>Loading...</p>
        )}
        <img
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/total-income-3395521-2825847.png"
          alt="Income Earned"
        />
      </div>
      <div className="card">
        <h2>Top Selling Product</h2>
        <div className="chart-container">
          <ChartComponent />
        </div>
      </div>
      <div className="card">
        <div className="chart-container">
          <ChartComponentPro chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Sales;
