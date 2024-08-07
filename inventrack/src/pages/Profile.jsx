import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        axios.get(`/user/profile/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [userId]);

    return (
        <div>
            <Navbar />
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <h2>{user.name}</h2>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Footer />
        </div>
    );
};

export default Profile;
