import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupplyRequests, updateSupplyRequest, deleteSupplyRequest } from '../../api'; // Corrected import path
import './SupplyRequest.css';
import Modal from '../Modal'; // Import the custom Modal component

const SupplyRequest = () => {
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [editForm, setEditForm] = useState({
    quantity: '',
    status: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getSupplyRequests();
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching supply requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateSupplyRequest(id, { status: 'approved' });
      const response = await getSupplyRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error updating supply request:', error);
    }
  };

  const openModal = (request) => {
    setRequestToDelete(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRequestToDelete(null);
  };

  const confirmDelete = async () => {
    if (requestToDelete) {
      try {
        await deleteSupplyRequest(requestToDelete.id);
        const response = await getSupplyRequests();
        setRequests(response.data);
      } catch (error) {
        console.error('Error deleting supply request:', error);
      }
      closeModal();
    }
  };

  const handleEditClick = (request) => {
    setEditingRequest(request);
    setEditForm({
      quantity: request.quantity,
      status: request.status
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editingRequest) {
      try {
        await updateSupplyRequest(editingRequest.id, editForm);
        setEditingRequest(null);
        const response = await getSupplyRequests();
        setRequests(response.data);
      } catch (error) {
        console.error('Error updating supply request:', error);
      }
    }
  };

  return (
    <div className="supply-request">
      <h1>Supply Requests</h1>
      
      {editingRequest && (
        <div className="edit-form">
          <h2>Edit Supply Request</h2>
          <form onSubmit={handleEditSubmit}>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={editForm.quantity}
                onChange={handleEditChange}
                required
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                value={editForm.status}
                onChange={handleEditChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingRequest(null)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Button to go back to the Admin Dashboard */}
      <button className="go-back-btn" onClick={() => navigate('/admin/dashboard')}>
        Go Back to Admin Dashboard
      </button>

      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map(request => (
              <tr key={request.id}>
                <td>{request.quantity}</td>
                <td>{request.status}</td>
                <td>{new Date(request.created_at).toLocaleDateString()}</td>
                <td>
                  {request.status === 'pending' && (
                    <>
                      <button onClick={() => handleApprove(request.id)}>Approve</button>
                      <button onClick={() => handleEditClick(request)}>Edit</button>
                    </>
                  )}
                  <button onClick={() => openModal(request)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No supply requests found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Custom Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default SupplyRequest;
