import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
