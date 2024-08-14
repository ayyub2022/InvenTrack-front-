import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Instock from "./components/InStock";
import Products from "./components/Products";
import Settings from "./components/Settings";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import NotFound from "./components/Error404";
import Appearance from './components/Appearance';
import AdminHomePage from './components/AdminHomePage';
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login"; // Ensure this import is correct
import { useTheme } from './components/ThemeContext'; // Import the useTheme hook

// Example components for new routes
const ProtectedComponent = () => <div>Protected Content</div>;
const PublicComponent = () => <div>Public Content</div>;
const LoginComponent = () => <div>Login</div>;

function App() {
  const [toCart, setCart] = useState([]);
  const { theme, fontSize } = useTheme(); // Use the useTheme hook
  
  const addToCart = (product) => {
    setCart([...toCart, product]);
    console.log(toCart);
  };

  useEffect(() => {
    document.body.className = `${theme} ${fontSize}`;
  }, [theme, fontSize]);

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> {/* Protected Route */}
          <Route path="/stock" element={<Instock />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail addToCart={addToCart} />} /> 
          <Route path="/cart" element={<ProtectedRoute element={<Cart cart={toCart} />} />} /> 
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<AdminHomePage />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="*" element={<NotFound />} /> 
          <Route path="/appearance" element={<Appearance />} />
          <Route path="/protected" element={<ProtectedRoute element={<ProtectedComponent />} />} />
          <Route path="/public" element={<PublicComponent />} />
          <Route path="/login-component" element={<LoginComponent />} /> {/* Example login component */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
