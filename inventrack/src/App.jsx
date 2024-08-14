import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Instock from "./components/InStock";
import Products from "./components/Products";

import Settings from "./components/Settings";
import ProductDetail from "./components/ProductDetail"; 
import Cart from "./components/Cart";
import NotFound from "./components/Error404"; 
import { useTheme } from './components/ThemeContext';
import Appearance from './components/Appearance';
import AdminHomePage from './components/AdminHomePage';


function App() {

  const [toCart,setCart]=useState([])
  const addToCart=(product)=>{
    setCart([...toCart,product])
    console.log(toCart)
  }
  const { theme, fontSize } = useTheme();

    React.useEffect(() => {
        document.body.className = `${theme} ${fontSize}`;
    }, [theme, fontSize]);



  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/stock" element={<Instock />} />
          <Route path="/products" element={<Products/>} />

          <Route path="/products/:productId" element={<ProductDetail addToCart={addToCart} />} /> 

          <Route path="/cart" element={<Cart cart={toCart} />} /> 
         
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<AdminHomePage />} /> 
          <Route path="*" element={<NotFound />} /> 
          <Route path="/appearance" element={<Appearance />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;