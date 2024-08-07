import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import './Profile.css'; 

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/user/profile/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError('Error fetching user profile.');
                console.error('Error fetching user profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    return (
        <div className="profile-container">
            <Navbar />
            <div className="profile-content">
                <h1>User Profile</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    user && (
                        <div className="profile-details">
                            <h2>{user.name}</h2>
                            <p>Email: {user.email}</p>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
