import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('https://inventrack-ovku.onrender.com/checksession', { withCredentials: true });
                setIsAuthenticated(response.status === 200);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, [setIsAuthenticated]); // Added setIsAuthenticated to the dependency array

    const handleLogout = async () => {
        try {
            await axios.post('https://inventrack-ovku.onrender.com/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
            navigate('/'); // Redirect to home page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/stock">In Stock</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                
                {isAuthenticated ? (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
