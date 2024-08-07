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
                <li className="dropdown">
                    <button className="dropdown-button" onClick={toggleDropdown}>
                        More
                    </button>
                    <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                        <Link to="/stock">In Stock</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/sales">Sales</Link>
                        <Link to="/orders">Orders</Link>
                        <Link to="/settings">Settings</Link>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
