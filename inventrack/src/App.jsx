import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Instock from "./components/Instock";
import Products from "./components/Products";
import Overview from "./components/Overview";
import Settings from "./components/Settings";
import ProductDetail from "./components/ProductDetail"; // Import the new component
import Cart from "./components/Cart"; // Import the new component
import NotFound from "./components/Error404"; // Import the NotFound component
import AdminHomePage from './components/AdminHomePage';
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {

  const [toCart,setCart]=useState([])
  const addToCart=(product)=>{
    setCart([...toCart,product])
    console.log(toCart)
  }


  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/stock" element={<Instock />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:productId" element={<ProductDetail addToCart={addToCart} />} /> {/* New route */}
          <Route path="/cart" element={<Cart cart={toCart} />} /> {/* New route */}
          <Route path="/overview" element={<Overview />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<AdminHomePage />} /> {/* New route */}
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
