import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

function App() {
    return (
      <Router>
      <Navbar />
      <div className="content">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:userId" element={<Profile />} />
              </Routes>
            </div>
            <Footer />
        </Router>
    );
};
export default App;
