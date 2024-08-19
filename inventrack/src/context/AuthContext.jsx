// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status on mount
        const checkAuthStatus = async () => {
            // Example logic to check auth status
            const response = await fetch('/api/auth/status');
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
