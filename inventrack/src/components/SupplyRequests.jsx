import React, { useState, useEffect } from 'react';
import {
  getSupplyRequests,
  createSupplyRequest,
  updateSupplyRequest,
  deleteSupplyRequest,
} from '../api';
// import './SupplyRequests.css';

const SupplyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [newRequest, setNewRequest] = useState({
    product_id: '',
    quantity: '',
    clerk_id: '',
    status: 'pending',
  });

  useEffect(() => {
    getSupplyRequests()
      .then((response) => {
        console.log('Fetched data:', response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCreateRequest = async () => {
    try {
      const response = await createSupplyRequest(newRequest);
      console.log('Create request response:', response.data);
      setRequests([...requests, response.data]);
      setNewRequest({
        product_id: '',
        quantity: '',
        clerk_id: '',
        status: 'pending',
      });
    } catch (error) {
      console.error('Error creating supply request:', error);
    }
  };

  const handleUpdateRequest = async (id, updatedData) => {
    try {
      const response = await updateSupplyRequest(id, updatedData);
      console.log('Update request response:', response.data);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? response.data : request
        )
      );
    } catch (error) {
      console.error('Error updating supply request:', error);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await deleteSupplyRequest(id);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error('Error deleting supply request:', error);
    }
  };

  const handleApproval = async (id, status) => {
    setLoadingId(id);
    try {
      await handleUpdateRequest(id, { status });
    } finally {
      setLoadingId(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="supply-requests-container">
      <h1>Supply Requests</h1>
      <div className="create-request-form">
        <h2>Create New Request</h2>
        <input
          type="text"
          name="product_id"
          placeholder="Product ID"
          value={newRequest.product_id}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newRequest.quantity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="clerk_id"
          placeholder="Clerk ID"
          value={newRequest.clerk_id}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateRequest}>Create Request</button>
      </div>
      {requests.length === 0 ? (
        <p>No supply requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Clerk ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.product_id}</td>
                <td>{request.quantity}</td>
                <td>{request.clerk_id}</td>
                <td>
                  {loadingId === request.id
                    ? 'Loading...'
                    : request.status}
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(request.id, 'approved')}
                    disabled={loadingId === request.id}
                    className="approve-button"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(request.id, 'declined')}
                    disabled={loadingId === request.id}
                    className="decline-button"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(request.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SupplyRequests;
