import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clerks = () => {
  const [clerks, setClerks] = useState([]);
  const [newClerk, setNewClerk] = useState({ name: '', status: '' }); // Assuming a 'status' field for clerks

  // Fetch clerks on component mount and handle errors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/clerks');
        setClerks(response.data);
      } catch (error) {
        console.error('Error fetching clerks:', error);
      }
    };
    fetchData();
  }, []);

  // Handle clerk creation (requires Admin role)
  const handleAddClerk = async () => {
    try {
      const response = await axios.post('/api/clerks', newClerk);
      setClerks([...clerks, response.data]);
      setNewClerk({ name: '', status: '' }); // Clear form after successful creation
    } catch (error) {
      console.error('Error adding clerk:', error);
    }
  };

  // Handle clerk deletion (requires Admin role)
  const handleDeleteClerk = async (clerkId) => {
    try {
      await axios.delete(`/api/clerks/${clerkId}`);
      setClerks(clerks.filter((clerk) => clerk.id !== clerkId));
    } catch (error) {
      console.error('Error deleting clerk:', error);
    }
  };

  return (
    <div className="clerks-container">
      <h1>Clerk Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clerks.map((clerk) => (
            <tr key={clerk.id}>
              <td>{clerk.name}</td>
              <td>{clerk.status}</td>
              <td>
                <button onClick={() => handleDeleteClerk(clerk.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="Clerk Name"
          value={newClerk.name}
          onChange={(e) => setNewClerk({ ...newClerk, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={newClerk.status}
          onChange={(e) => setNewClerk({ ...newClerk, status: e.target.value })}
        />
        <button onClick={handleAddClerk}>Add New Clerk</button>
      </div>
    </div>
  );
};

export default Clerks;