// src/components/Modal.jsx
import React from 'react';
import './Modal.css'; // Add styles for the modal

const Modal = ({ isOpen, onRequestClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure?</h2>
        <p>Do you really want to delete this request?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="modal-confirm-button">Yes, Delete</button>
          <button onClick={onRequestClose} className="modal-cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
