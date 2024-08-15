import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5555/profile");
        setUser(response.data);
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        );
        setError("Error fetching user profile. Please try again later.");
      }
    };
    getUserProfile();
  }, []);

  if (error) return <div className="profile-error">{error}</div>;
  if (!user) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">{user.name}'s Profile</h1>
      <p className="profile-info">
        Email: <span>{user.email}</span>
      </p>
      <p className="profile-info">
        Account Created:{" "}
        <span>{new Date(user.created_at).toLocaleString()}</span>
      </p>

      <h2 className="profile-section-title">Activities</h2>
      <ul className="profile-list">
        {user.activities.map((activity, index) => (
          <li key={index} className="profile-list-item">
            <strong>{activity.activity}</strong> -{" "}
            {new Date(activity.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>

      <h2 className="profile-section-title">Transaction History</h2>
      <ul className="profile-list">
        {user.transaction_history.map((transaction) => (
          <li key={transaction.id} className="profile-list-item">
            <strong>Transaction #{transaction.id}</strong>:{" "}
            {transaction.transaction_type} (Inventory ID:{" "}
            {transaction.inventory_id})
          </li>
        ))}
      </ul>
    </div>
  );
}
