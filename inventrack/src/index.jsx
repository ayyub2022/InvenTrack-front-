// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './context/AuthContext';  // Import the AuthProvider
import './App.css'; // Ensure global styles are imported

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ThemeProvider>
);
