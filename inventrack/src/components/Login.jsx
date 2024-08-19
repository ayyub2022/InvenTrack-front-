import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Home.css';

const Home = () => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };
    const [data, setData] = useState({
        bestSellerLast7Days: null,
        totalRevenue: null,
        totalSaleReturn: null,
        totalPurchase: null,
        totalIncome: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bestSellerLast7DaysResponse, totalRevenueResponse, totalSaleReturnResponse, totalPurchaseResponse] = await Promise.all([
                    axios.get("http://127.0.0.1:5555/best_seller_last_7_days"),
                    axios.get("http://127.0.0.1:5555/total_revenue"),
                    axios.get("http://127.0.0.1:5555/total_sale_return"),
                    axios.get("http://127.0.0.1:5555/total_purchase"),

                ]);

                setData({
                    bestSellerLast7Days: bestSellerLast7DaysResponse.data,
                    totalRevenue: totalRevenueResponse.data,
                    totalSaleReturn: totalSaleReturnResponse.data,
                    totalPurchase: totalPurchaseResponse.data,

                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const { bestSellerLast7Days, totalRevenue, totalSaleReturn, totalPurchase,  } = data;

    return (
        <div className="home-container">
            <header className="welcome-header">
                <h1>Welcome to Our Dashboard</h1>
                <p>Your one-stop solution for managing sales, revenue, and more.</p>
                <img
                    src="https://st.depositphotos.com/9999814/52407/i/450/depositphotos_524071248-stock-photo-smart-warehouse-management-system-with.jpg"
                    alt="Welcome"
                    className="welcome-image"
                />
            </header>

            <div className="card-container">
                <div className="card">
                    <h2>Best Seller from Last 7 Days</h2>
                    {bestSellerLast7Days ? (
                        <p>{bestSellerLast7Days.product}: {bestSellerLast7Days.total_quantity}</p>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="card">
                    <h2>Total Revenue</h2>
                    {totalRevenue ? (
                        <p>{formatCurrency(totalRevenue.total_revenue)}</p>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="card">
                    <h2>Total Sale Return</h2>
                    {totalSaleReturn ? (
                        <p>{formatCurrency(totalSaleReturn.total_sale_return)}</p>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="card">
                    <h2>Total Purchase</h2>
                    {totalPurchase ? (
                        <p>{formatCurrency(totalPurchase.total_purchase)}</p>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Home;


 import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Navigate} from 'react-router-dom';

const Login = ({setIsAuthenticated}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let response;

      if (isLogin) {
        response = await axios.post(
          'http://localhost:5555/login',
          { email: formData.email, password: formData.password },
          {
            withCredentials: true, // Ensures cookies are sent and stored
          }
        );


      } else {
        response = await axios.post(
          'http://localhost:5555/signup',
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          },
          {
            withCredentials: true,
          }
        );
      }

      // Handle success
      setSuccess(response.data.message);
      setError('');
    } catch (error) {
      // Handle error
      setSuccess('');
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success==="Login successful"?<>
          <Navigate to={'/'}/>
          {setIsAuthenticated(true)}
          </>:<></>}</div>}
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}

        </button>
      </div>
    </div>
  );
};

export default Login;
