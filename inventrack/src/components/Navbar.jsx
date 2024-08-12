import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/stock">In Stock</Link></li>
                <li> <Link to="/products">Products</Link></li>
                <li className="dropdown">
                    <button className="dropdown-button" onClick={toggleDropdown}>
                        More
                    </button>
                    <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                        <Link to="/Overview">Overview</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/settings">Settings</Link>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
